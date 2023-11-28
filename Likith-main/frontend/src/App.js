import DynamicInputs from "./DynamicInputs";
import NavComp from "./NavComp";

function App() {
  return (
    <>
    <NavComp/>
    <div className="container">
      <div className='row'>
        <div className='col'>
          <DynamicInputs/>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
