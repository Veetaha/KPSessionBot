import * as Mongoose from 'mongoose';
import { CrudPluginStatics } from '@modules/mongoose-plugins/apollo-crud';
import { 
    AcademicActivityDoc, 
    AcademicActivityData 
} from '@models/academic-activity';
import { Student } from '@models/student'

export interface AcademicSubjectData {
    name:     string;      // globally unique 
    teachers: string[];    // represents teacher's names

    // contain data needed to generate marks and render templates
	practice: AcademicActivityDoc; 
	credit:   AcademicActivityDoc;
	exam:     AcademicActivityDoc;
}
export type AcademicActivityType = 'practice' | 'credit' | 'exam';


export interface MarkAndMessage {
    mark:    number;
    message: string;
}

export interface AcademicSubjectMethods {
    /**
     * Generates random mark and renres according template for the given student.
     * Note that this method doesn't update any DB data, you have to update Student
     * score manually, based on the returned data.
     * 
     * @param activityType Type of ativity to generate mark for.
     * @param studentName  Name of the target student, who gets a mark.
     */
    randomMarkAndMessage(
        this:         AcademicSubjectDoc,
        activityType: AcademicActivityType,
        studentName:  string
    ): MarkAndMessage;
}

export interface AcademicSubjectStatics {    
    /**
     *  Tries to retrieve AcademicSubjectDoc from db by `name` field.
     *  Rejects Promise with ApolloError if no such AcademicSubject was found.
     *
     * @param name Name of AcademicSubjectDoc to search for.
     */
    tryFindByName(
        this: AcademicSubjectModel,
        name: string
    ): Promise<AcademicSubjectDoc>;
}

export interface AcademicSubjectDoc extends 
Mongoose.Document, 
AcademicSubjectData, 
AcademicSubjectMethods 
{}
export interface AcademicSubjectModel extends 
Mongoose.PaginateModel<AcademicSubjectDoc>,  
CrudPluginStatics<AcademicSubjectDoc>,
AcademicSubjectStatics
{}