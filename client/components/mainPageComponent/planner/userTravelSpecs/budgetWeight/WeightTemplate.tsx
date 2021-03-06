import { InputAdornment, Slider, TextField } from "@mui/material";
import budgetState from "atoms/plannerAtoms/budgetState";
import React, { ChangeEvent } from "react";
import { SetterOrUpdater, useRecoilValue } from "recoil";
import styled from "styled-components";

const WeightTemplateContainer = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
`;

const WeightSubject = styled.h3`
  width: 8vw;
  height: 40px;
  margin-right: 0.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #f6f8fa;
  background-color: #f6f8fa;
  border-radius: 10px;
`;

interface WeightTemplateType {
  subjectName: string;
  weightValue: number;
  setWeightValue: SetterOrUpdater<number>;
}

function WeightTemplate({
  subjectName,
  weightValue,
  setWeightValue,
}: WeightTemplateType) {
  const budget = useRecoilValue(budgetState);

  const onWeightChange = (
    newWeightEvent: Event | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newWeightParam?: number | Array<number>,
  ) => {
    if (newWeightParam !== undefined) {
      setWeightValue(newWeightParam as number);
    } else {
      const newWeight = Number(
        (
          newWeightEvent as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ).target.value.replace(/,/g, ""),
      );
      if (Number.isNaN(newWeight) === false) {
        if (newWeight <= budget) setWeightValue(newWeight);
      }
    }
  };

  return (
    <WeightTemplateContainer>
      <WeightSubject>{subjectName}</WeightSubject>
      <Slider
        size="medium"
        aria-label={`${subjectName}-label`}
        valueLabelDisplay="auto"
        sx={{ color: "#bababa" }}
        value={weightValue}
        onChange={onWeightChange}
        max={budget}
        step={1000}
      />
      <TextField
        id={`${subjectName}Weight-textfield`}
        label={subjectName}
        variant="outlined"
        placeholder="예산"
        size="small"
        InputProps={{
          endAdornment: <InputAdornment position="end">원</InputAdornment>,
        }}
        sx={{
          width: "50%",
          marginLeft: "0.5vw",
        }}
        value={weightValue.toLocaleString()}
        onChange={onWeightChange}
      />
    </WeightTemplateContainer>
  );
}

export default WeightTemplate;
