import { useEffect, useState } from 'react';
import { SectionForeground } from '../../layouts/Section';
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
import { ReactComponent as EyeIcon } from '../../assets/icons/Eye.svg';
import { inputType } from '../../components/Fields/Input';
import classes from './styles/index.module.css';

const SignIn = () => {
  const [type, setType] = useState<
    typeof inputType.password | typeof inputType.text
  >(inputType.password);

  const { signOut } = useAuth();
  const { translate } = useTranslation();
  const { handleFormSubmit } = useSignInFormSubmit();

  useEffect(() => {
    signOut();
  }, [signOut]);

  const { control, handleSubmit } = useSignInForm({
    submitHandler: handleFormSubmit,
  });

  const handleIconClick = () => {
    setType((prevState) => {
      return prevState === inputType.password
        ? inputType.text
        : inputType.password;
    });
  };

  const isPasswordType = type === inputType.password;

  const iconLabel = isPasswordType
    ? translate('signIn.password.show')
    : translate('signIn.password.hide');

  const inputPasswordClassName = isPasswordType
    ? undefined
    : classes.input__password_activeIcon;

  return (
    <>
      <Top>
        <TopHeading>{translate('signIn.enter')}</TopHeading>
      </Top>
      <SectionForeground>
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
                type={type}
                name={signInFormFields.password}
                label={translate('signIn.password')}
                placeholder={translate('signIn.password.description')}
                Icon={EyeIcon}
                onIconClick={handleIconClick}
                iconAriaLabel={iconLabel}
                inputClassName={inputPasswordClassName}
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
      </SectionForeground>
    </>
  );
};

export default SignIn;
