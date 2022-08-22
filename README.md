# Scheduler

Edit and generate dated schedules for all Rocket Academy Courses.

## How to edit/generate schedules

We currently manage schedules by editing relevant schedule template JSON files in `src/data/schedule-templates` and re-generating the relevant batches' schedules using the Generate Schedule Data File interface in the Batch tab of `localhost:3000/#/admin` when running the app locally. Rocket recommends only updating the templates and not batch-specific schedules directly if possible, because the latter makes it difficult for Rocket to make cross-batch changes by updating templates and re-generating each batch's schedule (local batch changes would be overwritten).

To edit/generate a batch schedule, e.g. FTBC6:

1. Clone scheduler repo locally
2. Edit the FTBC1.0/2.0/3.0 or PTBC1.0/2.0/3.0 template JSON file (in `src/data/schedule-templates`) to how we want it to be. FTBC6 is on FTBC1.0, FTBC7 on FTBC2.0, PTBC1 and PTBC2 on PTBC1.0, PTBC3 and PTBC4 on PTBC3.0.
3. If you are generating a new PT course ensure the the course starts on the correct day, 0 is Tuesday, 1 is Saturday, `ptbc3.0-schedule-template.json`:
   ` "courseStartDaysOfWeekIndex": 0,`
4. Edit `src/generateCourseDates.js` to reference the relevant FTBC1.0/2.0/3.0 template when generating FTBC schedules, likewise for PTBC. E.g. for FTBC6, make it reference the FTBC1.0 template.
5. Check holidays.json to ensure that holidays (public and company) that would occur during your course are included, such that the scheduler exlcudes these dates.
6. `npm start` to run scheduler locally
7. Navigate to `localhost:3000/#/admin`, enter Start Date (e.g. 10 Jan ’22), Batch Number (e.g. 6) and Course Type (e.g. FTBC), and click Download Schedule.
8. Copy the downloaded schedule into the `src/data` folder
9. Verify `src/App.js` is referencing the correct file that we just copied to `src/data` when rendering the relevant batch’s schedule
10. Verify the schedule changes are as expected at `localhost:3000`
11. Commit and push changes to GitHub, GitHub will automatically deploy changes to `schedules.rocketacademy.co`.
