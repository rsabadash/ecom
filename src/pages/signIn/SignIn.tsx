import { useEffect, useState } from 'react';

import classes from './styles/index.module.css';

import { ReactComponent as EyeIcon } from '../../assets/icons/Eye.svg';
import { HiddenPoliteNotification } from '../../components/Accessibility';
import { useAuth } from '../../components/AuthProvider';
import { Button } from '../../components/Button';
import { INPUT_TYPE } from '../../components/Fields/Input';
import { Form } from '../../components/FormFields';
import {
  CheckboxAdapter,
  InputAdapter,
} from '../../components/FormFieldsAdapter';
import { useTranslation } from '../../components/IntlProvider';
import { GridAutoFit, GridFullWidth } from '../../layouts/Grid';
import { SectionForeground } from '../../layouts/Section';
import { Top, TopHeading } from '../../layouts/Top';
import { PASSWORD_ICON_ID, signInFormFields } from './constants';
import { useSignInForm, useSignInFormSubmit } from './hooks';

const SignIn = () => {
  const [type, setType] = useState<
    typeof INPUT_TYPE.PASSWORD | typeof INPUT_TYPE.TEXT
  >(INPUT_TYPE.PASSWORD);

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
      return prevState === INPUT_TYPE.PASSWORD
        ? INPUT_TYPE.TEXT
        : INPUT_TYPE.PASSWORD;
    });
  };

  const isPasswordType = type === INPUT_TYPE.PASSWORD;

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
                iconId={PASSWORD_ICON_ID}
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
        <HiddenPoliteNotification id={PASSWORD_ICON_ID}>
          {type === INPUT_TYPE.PASSWORD
            ? translate('signIn.password.state.hidden')
            : translate('signIn.password.state.shown')}
        </HiddenPoliteNotification>
      </SectionForeground>
    </>
  );
};

export default SignIn;
