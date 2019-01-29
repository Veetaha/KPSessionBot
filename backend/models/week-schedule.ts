import * as Mongoose from 'mongoose';
import * as Const    from '@app/config/constants';
import { assert }    from '@modules/debug';
import * as Errors   from '@modules/error';

import { 
    WeekScheduleMethods 
} from        '@models/declarations/week-schedule';
export * from '@models/declarations/week-schedule';

export const Schema = new Mongoose.Schema({
    subjects: { type: [[String]], required: false } 
});

const Methods: WeekScheduleMethods = {
    todaySubjects() {
        if (!this.subjects) {
            throw new Errors.NoScheduleIsSetError;
        }
        // Date.getDay() => 0 - Sunday, 1 - Monday
        const weekDay = new Date().getDay();
        if (!weekDay) {
            throw new Errors.NoScheduleForSundayError;
        }
        assert(this.subjects[weekDay - 1]);
        return this.subjects[weekDay - 1];
    },
    async setRandomSchedule() {
        
    }
};

Schema.methods = Methods;
