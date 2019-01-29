import * as Mongoose from 'mongoose';
import { CrudPluginStatics } from '@modules/mongoose-plugins/apollo-crud';
import { Maybe             } from '@modules/interfaces';
import { ScoreDoc             } from '@models/score';


/**
 * This model represents a member of a group.
 * Each real telegram user may be in multiple groups, thus multiple student 
 * instances may have the same user `tg_id`, but both `tg_id` and `group_id`
 * together uniquely identify a Student.
 */
export interface StudentData {
    tg_name:   string;   // telegram nickname (@user) (for frontend)
    tg_id:     number;   // telegram user id
    group_id:  number;   // Group.chat_id

    marks: Mongoose.Types.Array<ScoreDoc>;
                                  // array of marks and
                                  // subjects composed into Score objects
                                  
    // date when student used /start command last time
    last_practice_date?: Maybe<Date>; 
    // date when this student was registered (for frontend) 
    init_date:           Date;        
}

export interface StudentMethods {
    
}

export interface StudentStatics {
    
}

export interface StudentDoc extends 
Mongoose.Document, 
StudentData, 
StudentMethods 
{}
export interface StudentModel extends 
Mongoose.PaginateModel<StudentDoc>, 
CrudPluginStatics<StudentDoc>,
StudentStatics
{}