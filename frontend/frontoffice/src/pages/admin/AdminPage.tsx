import { Flex } from '@mantine/core';
import { NavLink } from '@mantine/core';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Api } from '../../api';
import { AdminPageModelCreate } from './model/create/AdminPageModelCreate';

export function AdminPage() {
	const navigate = useNavigate();

	const { data: models } = useQuery({
		queryKey: ['Admin models'],
		queryFn: () => {
			return Api.admin.getModels().then((response) => response.data.models);
		},
	});

	return (
		<Flex>
			<Flex direction="column" gap="md" m="md">
				{models?.map((model) => (
					<Flex key={model} direction="row" gap="md" align="center">
						<NavLink
							label={model}
							onClick={() => navigate(`/admin/crud/${model}/list`)}
						/>
						<AdminPageModelCreate model={model} />
					</Flex>
				))}
			</Flex>
		</Flex>
	);
}
