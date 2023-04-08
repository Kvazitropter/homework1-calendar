import React from 'react';
import Calendar from './Calendar.jsx';

const now = new Date();

const App = () => (
  <Calendar date={now} />
);

export default App;
