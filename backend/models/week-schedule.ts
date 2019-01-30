import _ from 'lodash';
import * as Utils    from '@modules/utils';
import * as Mongoose from 'mongoose';
import * as Errors   from '@modules/error';
import * as Const    from '@app/config/constants';
import { randomSubjectsAmountForTerm } from '@app/config/algorithms';
import { assert                      } from '@modules/debug';
import { AcademicSubject             } from './academic-subject';
import { IntegerRange                } from '@modules/integer-range';
import { NotEnoughDocumentsError     } from '@modules/mongoose-plugins/pick-random';
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
        try {
            return this._setRandomSchedule(
                await AcademicSubject.tryPickRandomDocuments<{ name: string; }>(
                    randomSubjectsAmountForTerm(), { name: true }
                )
            );
        } catch (err) {
            throw err instanceof NotEnoughDocumentsError
                    ? new Errors.NotEnoughSubjectsError
                    : err; 
        }
    },

    async _setRandomSchedule(subjects) {
        const { timesSum, timesPerWeek } = this._randomTimesPerWeek(subjects.length);

        const randomSubjects = Utils.pickRandomItems(subjects, timesPerWeek); 

        // create a matrix of subjects that go inside a week evenly

        this.subjects = _.times(6, () => _.times(Math.floor(timesSum / 6), 
            () => randomSubjects.next().value.name
        ));

        // push remaining 0 - 5 subjects to random days
        
        for (const day of new IntegerRange(0, 6).randomUniqueIntegers(timesSum % 6)) {
            this.subjects[day].push(randomSubjects.next().value.name);
        }
        assert(randomSubjects.next().done);
    },

    _randomTimesPerWeek(subjectsAmount) {
        let totalEntries = 0;
        const timesPerWeek = _.times(subjectsAmount, () => { 
            const randomTimes = Const.SubjectTimesPerWeekRange.random();
            totalEntries += randomTimes;
            return randomTimes;
        });
        return {
            timesSum: totalEntries,
            timesPerWeek
        };
    }
};

Schema.methods = Methods;
