# Super dynamic data

Code challenge given by some company.

**Task requirements:**  

Create a Vue.js application with two pages.

1. First page should be on url `/`

   - On load this page should show 10 fields marked as A, B, C, D .... with initial value 3.
   - After page load, every 2 seconds all field values should be changed randomly. Change is randomly calculated as a number between 1 and 2 (1.45, 1.05...), with a separate random sign (-, +).
   - When adding the change to the previous value you should show an arrow pointing up or down, depending on the change sign (arrow down is for -, arrow up is for +).
   - Under each field there should be a toggle button to disable/enable the change on that field.

2. Second page should be on url `/statistics`

   - This page should show change statistics for all 10 fields.
   - Chart should show value changes in time.

3. When going from `/` to `/statistics` all the changing should be paused, and on returning back it should be resumed.

You can choose any libraries you want
