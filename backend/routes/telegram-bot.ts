import TgBotApi from 'node-telegram-bot-api';
import * as Config from '@app/config';
import { Log } from '@modules/debug';

export const TgBot = new TgBotApi(Config.TgBotToken);

// @FIXME: I wonder whether we have to close webhook manually.
TgBot.setWebHook(Config.TgBotWebookFullUrl, {
    allowed_updates: ['message']
}).then(() => Log.info('Telegram bot webhook set'));


TgBot.onText(/\/enroll/, msg => {
    Log.info(msg);
});

/*
use telegram bot middleware capabilities in order to identify user as a Student, whenever possible
use ‘cron’ library in order to setup delay for notifications or propose something else (requires discuss)
every 00:00 issue find Students where Student.last_practice is not today and issue a $StudentNotPracticed message, send all the groups their appropriate schedules for the new day


/enroll
	insert sender to the group of the chat as a new student (set all connections appropriately), return 		$SuccessfulEnrollment or $AlreadyEnrolledError.
/myRate 
    use Student.marks array to form a response and return sender’s list of marks, and total Student.rating()
/practice
	check that Student.last_practice_date is not the current day, take all AcademicSubjects from 			Group.week_schedule[current weekday], take random teacher from AcademicSubject.teachers and random mark 	from AcademicSubject.mark_ranges.practices, send a rendered template from 
	AcademicSubject.postive/negative_mark_temlp and or $AlreadyPracticed error;
	Update Student.marks array and Student.last_practice_date appropriately
/goToArmy 
	remove student, don’t delete connections explicitly in the handler (setup mongoose pre/post hook)
	return $SuccessfulTripToArmy or $UserNotEnrolledError
/allRate відображає рейтинг групи
	populate Group.members and return a message with the list of their Student.rating() or $EmptyRating
/passExam “EXAM”
	check that EXAM exists in Group.exams array and its date is today and Student.marks[EXAM].exam == null;
	get a random mark
/passCredit “CREDIT”
	check that Group.credit_start_date was not earlier than $CreditTimeDuration
	Student.marks[CREDIT].last_credit_date was not earlier than $CreditsRetryTimeout, generate a random mark
	from AcademicSubject.mark_ranges.credit and update Student.marks[CREDIT]
/exams
	return the list of exams from Group.exams array and join this info with the according scores from 
	Student.marks for the command issuer
/schedule
	return the list of AcademicSubject.name from Group.week_schedule[current weekday]
/credits
	return the list of exams from Group.credits array and join this info with the according scores from 
	Student.marks for the command issuer
*/









TgBot.on('message', msg => {
    TgBot.sendMessage(msg.chat.id, 'It is alive!');
});