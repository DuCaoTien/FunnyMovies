import Dashboard from "./pages/content/dashboard";
import Header from "./pages/content/header";
import SharedMovie from "./pages/content/shared-movie";
import "./scss/main.scss";

function App() {
  return (
	<div className="App">
		<Header />
        <Dashboard />
        {/*<SharedMovie />*/}
	</div>
  );
}

export default App;
