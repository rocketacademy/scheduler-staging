# Scheduler

A front-end app to edit and generate a dated schedule for all Rocket Academy Courses.

The app is Timezone aware.


# Instructions for use

The app is deployed at <https://rocketacademy.github.io/scheduler/#/admin>

# To generate schedule for a new Batch

Click on the "Batch" tab
Under Generate Schedule Data File, fill in the form with required information, please make sure date picked for Bootcamp start date is a Monday.
Select from -
* "render schedule": which will render the generated file in the app 
* "download schedule": which will download the generated file into the downloads folder of your computer 
* "add to github": this will take you to the create new file page of the github repo, press ctrl -a followed by ctrl -v to paste the generated file into the github repo
* "basics markdown": this will take you to the create new file page of the basics-docs repo, press ctrl -a followed by ctrl -v to paste the generated file into the github repo

# To edit main bootcamp json file

Click on the "Main" tab
Choose either part time or full time button to render either schedule
Next to each schedule item are 4 buttons -
* trash can symbol: deletes that item
* up arrow: used to move that item up a day in the schedule
* down arrow: used to move that item down a day in the schedule
* rectangular symbol: used to move that item to any day in the schedule

The up and down arrows on the right side of each section are used to move the entire section up/ down one day

After you have finished making your changes, click "edit in github repo" to make changes to the main file, then click the "update" buttons to edit that particular batch's schedule (click on the button, press ctrl -a, ctrl -v to paste the updated schedule into the github repo)

# To edit individual batch json files

Click on the "Batch" tab
Next to each schedule item are 4 buttons -
* trash can symbol: deletes that item
* up arrow: used to move that item up a day in the schedule
* down arrow: used to move that item down a day in the schedule
* rectangular symbol: used to move that item to any day in the schedule

The up and down arrows on the right side of each section are used to move the entire section up/ down one day

After you have finished making your changes, either click "edit in github repo" (click on the button, press ctrl -a, ctrl -v to paste the updated schedule into the github repo), or "download modified file" to download the edited file into the downloads folder of your computer

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
