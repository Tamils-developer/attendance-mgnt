import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { BootstrapButton, BootstrapButtonRemove, Textarea } from "../utils";
import { v4 as uuidv4 } from "uuid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./TaxDeclaration.css";

const TaxDeclaration = () => {
  const [selectedRegime, setSelectedRegime] = useState("newTaxRegime");
  const [date] = useState(new Date().getFullYear());
  const [section80C, setSection80C] = useState([
    { id: uuidv4(), categoryType: "", amount: "" },
  ]);
  const [section80D, setSection80D] = useState({
    coveredIndividuals: "",
    amount: "",
  });
  const [hra, setHra] = useState({
    nameOfLandlord: "",
    rentPaid: "",
    pan: "",
    address: "",
  });

  const [interestOnBorrowing, setInterestOnBorrowing] = useState({
    bankName: "",
    loanAccountNumber: "",
    branch: "",
    ifscCode: "",
    interestPaid: "",
  });

  const financialMonth = [
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
  ];

  const handleInputChange = (id: string, field: string, e: any) => {
    const newFormValues = section80C.map((item) =>
      item.id === id
        ? {
            ...item,
            [field]:
              field == "amount"
                ? handleRentValue(e, item.amount)
                : e.target.value,
          }
        : item
    );
    setSection80C(newFormValues);
  };

  const addFormFields = () => {
    setSection80C([
      ...section80C,
      { id: uuidv4(), categoryType: "", amount: "" },
    ]);
  };

  const removeFormFields = (i: number) => {
    let formValues = [...section80C];
    formValues.splice(i, 1);
    setSection80C(formValues);
  };

  const handleRentValue = (e: any, state: any) => {
    if (!Number.isNaN(Number(e.target.value))) return e.target.value;
    return state;
  };

  return (
    <Box>
      <Box className="__dashboard_main">
        <h1>Income Tax Declaration</h1>
        <Box className="__peron_head">
          <h5>Person One</h5>
          <p>Developer</p>
        </Box>
      </Box>
      <Box>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Tax Regime
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={selectedRegime}
            onChange={(e) => setSelectedRegime(e.target.value)}
          >
            <FormControlLabel
              value="newTaxRegime"
              control={<Radio />}
              label="New Tax Regime"
            />
            <FormControlLabel
              value="oldTaxRegime"
              control={<Radio />}
              label="Old Tax Regime"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        {selectedRegime === "oldTaxRegime" && (
          <Box>
            {/* <Box className="__house_rent_allowance"> */}
            <Accordion sx={{ marginTop: "1em" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>
                  <Typography variant="h5">
                    House Rent Allowance(HRA)
                  </Typography>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {financialMonth.map((month) => (
                  <>
                    <Typography variant="h5" sx={{ marginBottom: "1em" }}>
                      {month} ({date} - {date + 1})
                    </Typography>
                    <Box className="__hra_form_fields">
                      <FormControl>
                        <FormLabel>Name of the Landlord</FormLabel>
                        <TextField
                          type="text"
                          size="small"
                          onChange={(e) =>
                            setHra({ ...hra, nameOfLandlord: e.target.value })
                          }
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Rent paid to the Landlord</FormLabel>
                        <TextField
                          type="text"
                          size="small"
                          value={hra.rentPaid}
                          onChange={(e) =>
                            setHra({
                              ...hra,
                              rentPaid: handleRentValue(e, hra.rentPaid),
                            })
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box className="__hra_form_fields">
                      <FormControl>
                        <FormLabel>
                          Permanent Account Number of the Landlord
                        </FormLabel>
                        <TextField
                          type="text"
                          size="small"
                          onChange={(e) =>
                            setHra({
                              ...hra,
                              pan: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Address of the Landlord</FormLabel>
                        <Textarea
                          onChange={(e) =>
                            setHra({ ...hra, address: e.target.value })
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box className="__button_container">
                      <BootstrapButton variant="contained">
                        Submit
                      </BootstrapButton>
                    </Box>
                    <hr />
                  </>
                ))}
              </AccordionDetails>
            </Accordion>
            {/* </Box> */}
            <Box className="__house_rent_allowance">
              <Typography variant="h5">Home Loan</Typography>
              <Box className="__hra_form_fields">
                <FormControl>
                  <FormLabel>Bank Name</FormLabel>
                  <TextField
                    type="text"
                    size="small"
                    value={interestOnBorrowing.bankName}
                    onChange={(e) =>
                      setInterestOnBorrowing({
                        ...interestOnBorrowing,
                        bankName: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Loan Account Number</FormLabel>
                  <TextField
                    type="text"
                    size="small"
                    value={interestOnBorrowing.loanAccountNumber}
                    onChange={(e) =>
                      setInterestOnBorrowing({
                        ...interestOnBorrowing,
                        loanAccountNumber: handleRentValue(
                          e,
                          interestOnBorrowing.loanAccountNumber
                        ),
                      })
                    }
                  />
                </FormControl>
              </Box>
              <Box className="__hra_form_fields">
                <FormControl>
                  <FormLabel>Branch</FormLabel>
                  <TextField
                    type="text"
                    size="small"
                    value={interestOnBorrowing.branch}
                    onChange={(e) =>
                      setInterestOnBorrowing({
                        ...interestOnBorrowing,
                        branch: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>IFSC Code</FormLabel>
                  <TextField
                    type="text"
                    size="small"
                    value={interestOnBorrowing.ifscCode}
                    onChange={(e) =>
                      setInterestOnBorrowing({
                        ...interestOnBorrowing,
                        ifscCode: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </Box>
              <Box className="__hra_form_fields">
                <FormControl>
                  <FormLabel>Interest Paid</FormLabel>
                  <TextField
                    type="text"
                    size="small"
                    value={interestOnBorrowing.interestPaid}
                    onChange={(e) =>
                      setInterestOnBorrowing({
                        ...interestOnBorrowing,
                        interestPaid: handleRentValue(
                          e,
                          interestOnBorrowing.interestPaid
                        ),
                      })
                    }
                  />
                </FormControl>
                <FormControl></FormControl>
              </Box>
            </Box>
            <Box className="__house_rent_allowance">
              <Box className="__section_80_main">
                <Typography variant="h5">
                  Deductions under Section 80C
                </Typography>
                <BootstrapButton
                  variant="contained"
                  onClick={() => addFormFields()}
                >
                  Add Field
                </BootstrapButton>
              </Box>
              {section80C.map((item, index) => (
                <Box className="__hra_form_fields __section_80_c" key={index}>
                  <FormControl>
                    <FormLabel>Category Type</FormLabel>
                    <TextField
                      type="text"
                      size="small"
                      value={item.categoryType}
                      onChange={(e) =>
                        handleInputChange(item.id, "categoryType", e)
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Amount</FormLabel>
                    <TextField
                      type="text"
                      size="small"
                      value={item.amount}
                      onChange={(e) => handleInputChange(item.id, "amount", e)}
                    />
                  </FormControl>
                  {index ? (
                    <BootstrapButtonRemove
                      variant="contained"
                      color="error"
                      className="__button_container_remove"
                      onClick={() => removeFormFields(index)}
                    >
                      Remove
                    </BootstrapButtonRemove>
                  ) : (
                    <div
                      className="__section_80_c"
                      style={{ width: "15em" }}
                    ></div>
                  )}
                </Box>
              ))}
            </Box>
            <Box className="__house_rent_allowance">
              <Typography variant="h5">Deductions under Section 80D</Typography>
              <Box className="__hra_form_fields">
                <FormControl>
                  <FormLabel>Covered Individuals</FormLabel>
                  <TextField
                    type="text"
                    size="small"
                    value={section80D.coveredIndividuals}
                    onChange={(e) =>
                      setSection80D({
                        ...section80D,
                        coveredIndividuals: e.target.value,
                      })
                    }
                  />
                </FormControl>
                {/* <FormControl>
                  <FormLabel>For Self,Family & Children</FormLabel>
                  <TextField
                    type="text"
                    size="small"
                    value={section80D.selfFamily}
                    onChange={(e) =>
                      setSection80D({
                        ...section80D,
                        selfFamily: handleRentValue(e, section80D.selfFamily),
                      })
                    }
                  />
                </FormControl> */}
                <FormControl>
                  <FormLabel>Amount</FormLabel>
                  <TextField
                    type="text"
                    size="small"
                    value={section80D.amount}
                    onChange={(e) =>
                      setSection80D({
                        ...section80D,
                        amount: handleRentValue(e, section80D.amount),
                      })
                    }
                  />
                </FormControl>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <Box className="__button_container">
        <BootstrapButton variant="contained">Submit</BootstrapButton>
      </Box>
    </Box>
  );
};

export default TaxDeclaration;
