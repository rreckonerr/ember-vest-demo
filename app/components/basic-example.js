import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { create, test, enforce, only } from 'vest';

const validate = create('basicExampleForm', (data, changedField) => {
  only(changedField);

  test('username', 'Must be between 2 and 10 chars', () => {
    enforce(data.username).longerThanOrEquals(2).shorterThan(10);
  });

  test('password', 'Must contain at least one digit', () => {
    enforce(data.password).matches(/(?=.*[0-9])/);
  });
});

export default class BasicExampleComponent extends Component {
  @tracked
  validator = validate.get();

  @tracked
  username = '';

  @tracked
  password = '';

  get errorMessages() {
    return this.validator.getErrors();
  }

  validateForm(field) {
    this.validator = validate(
      {
        username: this.username,
        password: this.password,
      },
      field
    );
  }

  @action
  onSubmit(event) {
    event.preventDefault() && event.stopPropagation();

    this.validateForm();

    if (this.validator.hasErrors()) {
      console.log('Error');
    } else {
      console.log('Success');
    }
  }

  @action
  onUsernameChange({ target: { value } }) {
    this.username = value;
    this.validateForm('username');
  }

  @action
  onPasswordChange({ target: { value } }) {
    this.password = value;
    this.validateForm('password');
  }
}
