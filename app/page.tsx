import AddQuestionForm from '@/components/questions/add-question-form';
import QuestionsList from '@/components/questions/questions-list';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet';

export default function Home() {
	return (
		<div className='flex flex-col gap-4 items-center'>
			<Sheet>
				<SheetTrigger asChild>
					<Button>Add Question</Button>
				</SheetTrigger>
				<SheetContent className='px-4'>
					<SheetTitle>Add Question</SheetTitle>
					<SheetDescription></SheetDescription>
					<ScrollArea className='w-full'>
						<AddQuestionForm />
					</ScrollArea>
				</SheetContent>
			</Sheet>

			<div className='px-4'>
				<QuestionsList />
			</div>
		</div>
	);
}
