import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../Button";
import Card from "../Card";
import FormError from "../FormError";
import http from "../../utils/http";
import Input from "../Input";
import Layout from "../Layout";
import Loader from "../Loader";
import Select from "../Select";
import CLUBS from "../../constants/clubs";
import Urls from "../../constants/urls";

const ShotForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
  } = useFormik({
    initialValues: {
      club: null,
      distance: "",
    },
    onSubmit: async (values) => {
      try {
        await http.post(Urls.api.shots, { ...values, club: values.club.value });
        setIsLoading(true);
        props.history.push(Urls.routes.dashboard);
      } catch {
      } finally {
        setIsLoading(false);
      }
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      club: Yup.mixed().required("Please select a club"),
      distance: Yup.number().required("Please enter a distance"),
    }),
  });

  if (isLoading)
    return (
      <div className="d-flex justify-content-center">
        <Loader />
      </div>
    );

  return (
    <Layout>
      <Card className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Select
              name="club"
              onChange={(club) => {
                setFieldValue("club", club);
              }}
              options={CLUBS}
              placeholder="Select a club"
              value={values.club}
            />
            {errors.club && <FormError>{errors.club}</FormError>}
          </div>

          <div className="mb-3">
            <Input
              name="distance"
              onChange={handleChange}
              placeholder="Distance"
              type="number"
              value={values.distance}
            />
            {errors.distance && <FormError>{errors.distance}</FormError>}
          </div>
          <Button fluid type="submit">
            Save
          </Button>
        </form>
      </Card>
    </Layout>
  );
};

export default ShotForm;
