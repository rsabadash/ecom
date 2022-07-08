import { useTranslation} from '../../components/IntlProvider';
import MultiLanguageInput from '../../components/FormAdapter/MultiLanguageInput';
import MultiLanguage from '../../components/FormAdapter/MultiLanguageInput/MultiLanguage';
import Top from '../../layouts/Top';
import { useForm } from 'react-hook-form';
import {formFields} from "../products/categories/Comics/constants";
import InputAdapter from "../../components/FormAdapter/Input";

const Dashboard = () => {
    const { translate } = useTranslation();

    const {
        control,
        handleSubmit,
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <>
            <Top headingText={translate('dashboard')} />

            <form onSubmit={handleSubmit(onSubmit)}>
                <MultiLanguageInput
                    isRequired
                    name={formFields.title}
                    placeholder={translate('attributes.title.fillIn')}
                    label={translate('attributes.title')}
                    control={control}
                />

                <MultiLanguage>
                    <InputAdapter
                        isRequired
                        name={formFields.pages}
                        placeholder={translate('attributes.pages.fillIn')}
                        label={translate('attributes.pages')}
                        control={control}
                    />
                </MultiLanguage>

                <input type="submit" />
            </form>
        </>
    );
};

export default Dashboard;