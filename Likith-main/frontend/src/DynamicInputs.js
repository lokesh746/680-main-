import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table';
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const DynamicInputs = () => {
    const [inputs, setInputs] = useState([{ name: '', value: '' }]);
    const [selectedOption, setSelectedOption] = useState('');
    const [result, setResults] = useState([]);
    const [error, setError] = useState(false);
    const [outError, setOutError] = useState(false);
    const [logoutput, setlogoutput] = useState([]);
    const [baseInput, setBaseInpt] = useState("");
    const [errMsg, setErrMsg] = useState("")

    let { origin } = window;
    console.log(origin);
    // const API_URL = 'http://localhost:3005';
    const API_URL = origin;

    const handleDropdownChange = (event) => {
        console.log(event);
        setSelectedOption(event);
    };

    const handleInputChange = (index, event) => {
        const newInputs = [...inputs];
        newInputs[index][event.target.name] = event.target.value;
        setInputs(newInputs);
    };

    const handleAddInput = () => {
        setInputs([...inputs, { name: '', value: '' }]);
    };

    const handleRemoveInput = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
    };

    const getallPrevInpOut = async (e) => {
        try {
            let data = await axios.get(API_URL + "/getall");
            setlogoutput(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchResults = async (e) => {
        e.preventDefault();
        let reqObj = {
            criteria: selectedOption,
            characteristics: inputs,
            baseinpt: baseInput
        };
        console.log(reqObj);

        if (selectedOption === "" || inputs[0].name === '' || inputs[0].value === '') {
            setError(true);
        }
        else {

            console.log(reqObj);

            try {
                setError(false);
                setOutError(false)
                let response = await axios.post(API_URL + "/getResults", reqObj);
                console.log(response.data);
                setResults(response.data);
            } catch (error) {
                setOutError(true);
                console.log(error);
                setErrMsg(error?.response?.data);
            }

        }
    }



    function AccordionResult({ results }) {
        let rows = Math.ceil(results.length / 4);
        return (
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Results</Accordion.Header>
                    <Accordion.Body>
                        {results.length > 0 && outError === false ?
                            <Table hover bordered>
                                <tbody>
                                    {results.map((val, i) =>

                                        <tr key={i}>
                                            <td className='text-primary'>[{val.join(",")}]</td>
                                        </tr>
                                    )}
                                </tbody>

                            </Table>
                            :
                            null
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }



    return (
        <>
            <div className='container mt-5'>
                <div className='row text-center'>
                    <h1 className='text-primary'>Welcome to ISP</h1>
                </div>
            </div>
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-md-6'>
                        <h4>&nbsp;&nbsp;&nbsp;&nbsp; Characterisic Name</h4>
                    </div>
                    <div className='col-md-6'>
                        <h4>Characterisic Value</h4>
                    </div>
                </div>
            </div>
            <div className='container card p-5 mt-2'>
                <form>
                    {inputs.map((input, index) => (
                        <div key={index} className='row mt-2'>
                            <div className='col'>
                                <input className='form-control'
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={input.name}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className='col'>
                                <input
                                    className='form-control'
                                    type="text"
                                    placeholder="eg format: A1,B1,C1"
                                    name="value"
                                    value={input.value}
                                    onChange={(e) => handleInputChange(index, e)}
                                /></div>
                            <div className='col-md-2'>
                                <span className='text-danger'>
                                <MdDeleteOutline style={{fontSize:'30px',cursor:'pointer'}}  onClick={() => handleRemoveInput(index)} color='red' />
                                </span>
                                
                            </div>
                        </div>
                    ))}
                </form>


                <div className='row mt-2'>
                    <div className='col-md-3'>
                        {/* <button className='btn btn-success' type="button" onClick={handleAddInput}>
                            Add More
                        </button> */}
                        <FaPlus className='text-primary' onClick={handleAddInput} style={{fontSize:'25px',cursor:'pointer'}}/>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col-md-2'>

                       <DropdownButton
                            id="dropdown-button-dark-example2"
                            variant="secondary"
                            title="Select criteria"
                            className="mt-2"
                            onSelect={handleDropdownChange}
                        >
                            <Dropdown.Item eventKey="ACoC">All combinations </Dropdown.Item>
                            <Dropdown.Item eventKey="ECC">Each Choice</Dropdown.Item>
                            <Dropdown.Item eventKey="BCC">Base Choice</Dropdown.Item>
                        </DropdownButton>

                    </div>
                  
                </div>
                { selectedOption!==''? <div className='row mt-2 text-danger'>
                      &nbsp; &nbsp; Selected:&nbsp; {selectedOption}
                    </div>:null}

                {selectedOption === 'BCC' ?
                    <div className='row mt-2'>
                        <div className='col'>
                            Enter Base :
                            <input
                                className='form-control'
                                type="text"
                                placeholder="eg : A1,B1,C1"
                                name="value"
                                value={baseInput}
                                onChange={(e) => setBaseInpt(e.target.value)}
                            />
                        </div>
                    </div> : null}

                <div className='row mt-2'>
                    <button className='btn btn-primary' onClick={(e) => { fetchResults(e) }}>Fetch</button>
                </div>
            </div>

            {/* results container */}
            <div className='container mt-5'>
                <div className='row'>
                    {error === true ?
                        <div>
                            <Alert variant='danger'>
                            Missing values in the input
                            </Alert>
                           
                        </div>
                        :
                        <span>
                            {outError === false ? result.length > 0 ? <div className='col'>
                                <AccordionResult results={result} />
                            </div> : null :
                                <Alert variant="danger">
                                    {errMsg}
                                </Alert>}
                        </span>}
                </div>

            </div>

            <div className='container mt-3'>
                <div className='row'>
                    <div className='col'>
                        <button className='btn btn-warning' onClick={(e) => { getallPrevInpOut(e) }}>Get All Previous Results</button>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col'>
                        {logoutput.length > 0 ?
                            <Table hover bordered>
                                <thead className='bg-black'>

                                    <tr><th className='text-danger'>Input</th><th className='text-danger'>Output</th></tr>
                                </thead>
                                <tbody>
                                    {logoutput.map((e, i) => <tr key={i}>
                                        <td className='text-primary' >{JSON.stringify(e.input)}</td>
                                        <td className='text-success'>{JSON.stringify(e.output)}</td>
                                    </tr>)}
                                </tbody>
                            </Table>
                            :
                            null}
                    </div>
                </div>
            </div>

        </>
    );
};

export default DynamicInputs;
