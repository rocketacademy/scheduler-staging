# Scheduler

A front-end app to edit and generate a dated schedule for all Rocket Academy Courses. The app is timezone aware.

# How to run scheduler locally in development

Rocket built Scheduler using Create React App. To run the app locally, clone the repo and run `npm i` to install packages followed by `npm start` to start the server.

# Production usage instructions

The app is deployed at <https://rocketacademy.github.io/scheduler/#/admin>

## To generate schedule for new batch

Click on the "Batch" tab
Under Generate Schedule Data File, fill in the form with required information, please make sure date picked for Bootcamp start date is a Monday.
Select from -

- "render schedule": which will render the generated file in the app
- "download schedule": which will download the generated file into the downloads folder of your computer
- "add to github": this will take you to the create new file page of the github repo, press ctrl -a followed by ctrl -v to paste the generated file into the github repo
- "basics markdown": this will take you to the create new file page of the basics-docs repo, press ctrl -a followed by ctrl -v to paste the generated file into the github repo

## To edit schedule template files

Click on the "Main" tab
Choose either part time or full time button to render either schedule
Next to each schedule item are 4 buttons -

- trash can symbol: deletes that item
- up arrow: used to move that item up a day in the schedule
- down arrow: used to move that item down a day in the schedule
- rectangular symbol: used to move that item to any day in the schedule

The up and down arrows on the right side of each section are used to move the entire section up/ down one day

After you have finished making your changes, click "edit in github repo" to make changes to the main file, then click the "update" buttons to edit that particular batch's schedule (click on the button, press ctrl -a, ctrl -v to paste the updated schedule into the github repo)

## To edit batch-specific schedule files

Click on the "Batch" tab
Next to each schedule item are 4 buttons -

- trash can symbol: deletes that item
- up arrow: used to move that item up a day in the schedule
- down arrow: used to move that item down a day in the schedule
- rectangular symbol: used to move that item to any day in the schedule

The up and down arrows on the right side of each section are used to move the entire section up or down one day

After you have finished making your changes, either click "edit in github repo" (click on the button, press ctrl -a, ctrl -v to paste the updated schedule into the github repo), or "download modified file" to download the edited file into the downloads folder of your computer
