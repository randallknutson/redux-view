# redux-view
A View library for React, Redux and React Router applications.

Many people are building applications with the excellent Redux and React-Router libraries. However, figuring out how to access data and where to set up all the logic can be daunting at first. For example, when transitioning to a new Route, how do you dispatch new actions to the store? In mapDispatchToProps, how do you transition the router to a new Route, like going to the home page after a form submits?

These are the issues this library is meant to make easier.

## Installation

 Install via npm:
 
 ```bash
 npm install --save redux-view
 ```
 
 Then with a module bundler like webpack that supports either CommonJS or ES2015 modules, use as you would anything else:
 
 ```javascript
 // using an ES6 transpiler, like babel
 import ReduxView from 'redux-view';
 
 // not using an ES6 transpiler
 var ReduxView = require('redux-view');
 ```
 
**Requirements**
You will also need redux, react-redux, and react-router.
 
## About
A View created with redux-view will do several things.
 
First, it creates initialize and terminate methods that run when a View is entered and exited, respectively. One major gotcha is that componentWillMount only triggers the first time a component is mounted so if transitioning between two Routes that share the same base component it will not be triggered again. For example going from blog/123 to blog/234. Redux-view gets around this by checking componentWillReceiveProps to see if the location or parameters have changed. If they have we know we have moved to a different View and should trigger initialize and terminate.
 
Initialize and terminate have access to the store, router and props so logic can be configured to trigger on entering or exiting. For example, going to blog/123 could trigger a dispatch in initialize to fetch the 123 blog from a rest API.
 
Second, the Router is added as a third parameter to mapDispatchToProps. Ideally we would be using a [ControlledRouter](https://github.com/ReactTraining/react-router-addons-controlled) but for those not yet using it a frequent requirement is to navigate to a new route when a function is executed. This can now be done using the Router parameter.
 
Third, connecting a redux component is now wrapped up in a react component as a class instead of calling the connect function directly.
 
## Usage
Using redux-view is relatively straightforward.
 
```javascript
import ReduxView from 'redux-view';

class MyForm extends ReduxView {
  container = ({ form, onSave }) => {
    return <Form form={form} onSave={onSave} />
  }

  initialize = ({ dispatch }) => {
    dispatch(fetchForm(formName));
  }

  mapStateToProps = (state) => {
    return {
      form: state.myForm
    }
  }

  mapDispatchToProps = (dispatch, props, router) => {
   return {
     onSave: (data) => {
       dispatch(saveData(data));
       router.transitionTo('/');
     }
   }
  }
}

//...

render() {
  return (
    <BrowserRouter>
      <Match pattern="/form" component={MyForm} />
    </BrowserRouter>
  );
}
```
 
## Methods
The following methods can be set on the ReduxView extended class.

* [`initialize(store, props, router): null`] \(Function) - Will be called every time the View is entered.
  
* [`terminate(store, props, router): null`] \(Function) - Will be called every time the View is exited.
  
* [`container(props): component`] \(Function) - The elements that will be rendered.
  
* [`mapStateToProps(state, ownProps): props`] \(Function) - Used in react-redux connect.
  
* [`mapDispatchToProps(dispatch, ownProps, router): props`] \(Function) - Used in react-redux connect. Note the extra router parameter.
  
* [`mergeProps(stateProps, dispatchProps, ownProps): props`] \(Function) - Used in react-redux connect.
  
* [`options`] \(Object) - Used in react-redux connect.
 
## Examples
See [React Formio](https://github.com/formio/react-formio/tree/master/src) for examples of redux-views in action.