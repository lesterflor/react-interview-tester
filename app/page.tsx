import AddQuestionForm from '@/components/questions/add-question-form';
import { Button } from '@/components/ui/button';
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
					<AddQuestionForm />
				</SheetContent>
			</Sheet>
		</div>
	);
}
