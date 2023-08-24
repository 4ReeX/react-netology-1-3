import './App.css'
import Calendar from "./components/Calendar/Calendar.jsx";


function App() {
  // const now = new Date(2023, 7, 23); // Дата в JavaScript имеет нумерацию месяцев с 0 до 11
  const now = Date.now();
  return <Calendar date={now} />;
}
export default App;
