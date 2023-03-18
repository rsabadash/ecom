import { useEffect } from 'react';
import { Foreground } from '../../layouts/Foreground';
import { GridAutoFit, GridFullWidth } from '../../layouts/Grid';
import { Form } from '../../components/FormFields';
import {
  CheckboxAdapter,
  InputAdapter,
} from '../../components/FormFieldsAdapter';
import { useTranslation } from '../../components/IntlProvider';
import { useSignInForm, useSignInFormSubmit } from './hooks';
import { signInFormFields } from './constants';
import { Button } from '../../components/Button';
import { Top, TopHeading } from '../../layouts/Top';
import { useAuth } from '../../components/AuthProvider';

const SignIn = () => {
  const { signOut } = useAuth();
  const { translate } = useTranslation();
  const { handleFormSubmit } = useSignInFormSubmit();

  useEffect(() => {
    signOut();
  }, [signOut]);

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
                placeholder={translate('signIn.email.description')}
                control={control}
              />
            </GridFullWidth>
            <GridFullWidth>
              <InputAdapter
                isRequired
                type="password"
                name={signInFormFields.password}
                label={translate('signIn.password')}
                placeholder={translate('signIn.password.description')}
                control={control}
              />
            </GridFullWidth>
            <GridFullWidth>
              <CheckboxAdapter
                name={signInFormFields.isPersistUser}
                label={translate('signIn.isPersistUser')}
                placeholder={translate('signIn.isPersistUser.description')}
                control={control}
              />
            </GridFullWidth>
            <GridFullWidth>
              <Button variant="primary" type="submit" size="l">
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
