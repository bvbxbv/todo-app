import { FilterName, SortOrder, applyTodoFilters } from '../app/todoSort';
import { SelectContainer } from './ui/Select/SelectContainer';
import { SelectContainerItem } from './ui/Select/SelectContainerItem';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface FiltersProps {
	onFilterNameChange: (filterName: FilterName) => void;
	filterName: string;

	onSortOrderChange: (sortOrder: SortOrder) => void;
	sortOrder: string;

	onQueryChange: (query: string) => void;
}

export function Filters({
	onFilterNameChange,
	filterName,
	onSortOrderChange,
	sortOrder,
	onQueryChange,
}: FiltersProps) {
	return (
		<>
			<section id='filters'>
				<form action=''>
					<div className='group'>
						<div className='filter'>
							<SelectContainer
								name='filter-name'
								labelText='Filter'
								id='filter-name-select'
								onChange={(e) => {
									onFilterNameChange(e.target.value as FilterName);
								}}
								value={filterName}
							>
								<SelectContainerItem value='all' text='No matter what' />
								<SelectContainerItem value='detail' text='By description' />
								<SelectContainerItem value='title' text='By title' />
								<SelectContainerItem value='timestamp' text='By date' />
							</SelectContainer>
						</div>

						<div className='filter'>
							<SelectContainer
								name='sort-order'
								labelText='Sort'
								id='sort-order-select'
								value={sortOrder}
								onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
							>
								<SelectContainerItem value='asc' text='Ascending' />
								<SelectContainerItem value='desc' text='Descending' />
							</SelectContainer>
						</div>
					</div>

					<div className='group'>
						<Input
							name='search'
							id='search-input'
							placeholder='Wanna search something?'
							onChange={(e) => onQueryChange(e.target.value)}
						/>

						<Button text='&#8594;' type='submit' />
					</div>
				</form>
			</section>
		</>
	);
}
