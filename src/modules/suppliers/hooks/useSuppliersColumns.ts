import {TableColumnGeneric} from "../../../components/Table";
import {Supplier} from "../types";
import {useTranslation} from "../../../components/IntlProvider";

export const useSuppliersColumns = () => {
    const { translate } = useTranslation();

    const columns: TableColumnGeneric<Supplier>[] = [
        {
            title: translate('suppliers.name'),
            key: 'name',
            width: '30%',
            valueGetter: (value: string) => value
        },
        {
            title: translate('suppliers.account'),
            key: 'accountId',
            width: '30%',
            valueGetter: (value: boolean) => value ? value : '-'
        },
        {
            title: translate('suppliers.phone'),
            key: 'phoneNumber',
            width: '30%',
            valueGetter: (value: boolean) => value ? value : '-'
        }
    ];

    return columns;
}