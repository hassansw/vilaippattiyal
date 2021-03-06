import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';

import { Link, Redirect } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import { pink } from 'material-ui/colors';
import { AssignmentTurnedIn } from 'material-ui-icons';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import RaisedButton from 'material-ui/Button';

import { injectIntl, intlShape } from 'react-intl';

import InputComponent from '../../../shared/controls/input';
import translations from './translations';
import { commonTranslations } from '../../../../i18n';

const styles = theme => ({
  card: {
    minWidth: 300
  },
  action: {
    margin: theme.spacing.unit,
  },
  rowCenter: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: pink[500]
  },
  input: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    minWidth: 200,
    width: '100%'
  },
  typo: {
    fontSize: '11px'
  }
});

type Props = {
  handleSubmit: () => void,
  isRegistering: boolean,
  registered: boolean,
  intl: intlShape.int,
  classes: {}
};

class RegistrationForm extends PureComponent<Props> {
  props: Props;
  render() {
    const {
      handleSubmit, isRegistering, registered, intl, classes
    } = this.props;

    return registered ? (
      <Redirect to="/public/auth/login" />
    ) : (
      <Card className={classes.card}>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className={classes.rowCenter}>
                <Avatar className={classes.avatar}>
                  <AssignmentTurnedIn />
                </Avatar>
              </div>
              <div >
                <Field
                  name="firstname"
                  className={classes.input}
                  component={InputComponent}
                  label={intl.formatMessage(translations.firstName)}
                  disabled={isRegistering}
                />
              </div>
              <div >
                <Field
                  name="lastname"
                  className={classes.input}
                  component={InputComponent}
                  label={intl.formatMessage(translations.lastName)}
                  disabled={isRegistering}
                />
              </div>
              <div >
                <Field
                  name="email"
                  className={classes.input}
                  component={InputComponent}
                  label={intl.formatMessage(translations.email)}
                  disabled={isRegistering}
                />
              </div>
              <div>
                <Field
                  name="password"
                  className={classes.input}
                  component={InputComponent}
                  label={intl.formatMessage(translations.password)}
                  type="password"
                  disabled={isRegistering}
                />
              </div>
            </CardContent>
            <CardActions>
              <RaisedButton
                type="submit"
                variant="raised"
                color="primary"
                disabled={isRegistering}
                fullWidth
              >
                {intl.formatMessage(translations.regiterButtonText)}
              </RaisedButton>
            </CardActions>
            <div className={classes.rowCenter}>
              <Typography variant="body1" className={classes.typo}>
                {intl.formatMessage(translations.haveAccountText)} <Link to="/login">{intl.formatMessage(translations.loginText)}</Link>
              </Typography>
            </div>
          </form>
        </Card>
    );
  }
}

const formContainer = reduxForm({
  form: 'registration',
  validate: (values, props) => {
    const errors = {};
    const { formatMessage } = props.intl;
    const requireMessage = formatMessage(commonTranslations.requried);

    if (!values.email) {
      errors.email = requireMessage;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = formatMessage(commonTranslations.validEmailError);
    }
    if (!values.username) {
      errors.username = requireMessage;
    }
    if (!values.firstname) {
      errors.firstname = requireMessage;
    }
    if (!values.password) {
      errors.password = requireMessage;
    }
    return errors;
  }
})(RegistrationForm);

export default withStyles(styles)(injectIntl(formContainer));
