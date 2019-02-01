import * as Mongoose     from 'mongoose';
import * as Vts          from 'vee-type-safe';

import { Maybe  } from '@modules/interfaces';       
import { assert } from '@modules/debug';

import { NotEnoughDocumentsError } from '@modules/error/mongoose-plugins';
export { NotEnoughDocumentsError } from '@modules/error/mongoose-plugins';

type ProjectionOperand<TProjectedDoc> = {
    [TKey in keyof TProjectedDoc]?: 0 | 1 | false | true
};

export interface PickRandomPluginStatics<
    TDocData extends Vts.BasicObject,
    TDoc     extends Mongoose.Document
> {
    /**
     * Tries to pick random `docsAmount` of unique documents 
     * from the database collection.
     * 
     * @param docsAmount Exact amount of documents to pick randomly.
     * @param projection Projection stage operator to apply to retrieved documents.
     * 
     * @throws NotEnoughDocumentsError if `docsAmount` is greater
     *         than the total amount of documents stored in the database collection.
     */
    tryPickRandomDocuments<ProjectedData = TDocData>(
        this:        Mongoose.Model<TDoc>,
        docsAmount:  number,
        projection?: Maybe<ProjectionOperand<TDocData>>
    ): Promise<ProjectedData[]>;
}

export function PickRandomPlugin<
    TDocData extends Vts.BasicObject,
    TDoc     extends Mongoose.Document
>(schema: Mongoose.Schema) {
    const pluginStatics: PickRandomPluginStatics<TDocData, TDoc> = {
        async tryPickRandomDocuments(docsAmount, projection) {
            assert.matches(docsAmount, Vts.isPositiveInteger);
            
            const actualAmount = await this.estimatedDocumentCount().exec();

            if (docsAmount > actualAmount) {
                throw new NotEnoughDocumentsError(
                    docsAmount, actualAmount, this.collection.name
                );
            }
            const pipeline: object[] = [{ $sample: docsAmount }];
            if (projection) {
                pipeline.push({ $project: projection });
            }

            return this.aggregate(pipeline).exec(); // no return await !
        }
    };
    schema.static(Vts.reinterpret<Vts.BasicObject<Function>>(pluginStatics));
}