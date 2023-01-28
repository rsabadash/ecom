import { Foreground } from '../../components/Foreground';
import { GridAutoFit, GridFullWidth } from '../../layouts/Grid';
import { Form } from '../../components/FormFields/Form';
import { InputAdapter } from '../../components/FormFieldsAdapter';
import { useTranslation } from '../../components/IntlProvider';
import { useSignInForm } from './hooks';
import { useSignInFormSubmit } from './hooks';
import { signInFormFields } from './constants';
import { Button } from '../../components/Button';
import { Top, TopHeading } from '../../layouts/Top';

const SignIn = () => {
  const { translate } = useTranslation();
  const { handleFormSubmit } = useSignInFormSubmit();

  const { control, handleSubmit } = useSignInForm({
    submitHandler: handleFormSubmit,
  });

  return (
    <>
      <Top>
        <TopHeading>{translate('signIn.enter')}</TopHeading>
      </Top>
      <Foreground>
        <Form onSubmit={handleSubmit}>
          <GridAutoFit>
            <GridFullWidth>
              <InputAdapter
                isRequired
                type="email"
                name={signInFormFields.email}
                label={translate('signIn.email')}
                control={control}
              />
            </GridFullWidth>
            <GridFullWidth>
              <InputAdapter
                isRequired
                type="password"
                name={signInFormFields.password}
                label={translate('signIn.password')}
                control={control}
              />
            </GridFullWidth>
            <GridFullWidth>
              <Button variant="primary" type="submit">
                {translate('signIn')}
              </Button>
            </GridFullWidth>
          </GridAutoFit>
        </Form>
      </Foreground>
    </>
  );
};

export default SignIn;
