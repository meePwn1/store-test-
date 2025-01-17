import { Table } from '@/app/components/ui/table'

type Props = {
	columnsName: string[]
}

export const TableHeader = ({ columnsName }: Props) => {
	return (
		<Table.Head>
			<Table.Row className='bg-blue-300/60 text-left'>
				{columnsName.map((item, index) => (
					<Table.HeadCell key={index}>{item}</Table.HeadCell>
				))}
			</Table.Row>
		</Table.Head>
	)
}
