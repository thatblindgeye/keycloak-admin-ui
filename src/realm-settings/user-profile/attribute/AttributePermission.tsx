import React from "react";
import { Checkbox, FormGroup, Grid, GridItem } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import { HelpItem } from "../../../components/help-enabler/HelpItem";
import { Controller, useFormContext } from "react-hook-form";
import { FormAccess } from "../../../components/form-access/FormAccess";
import "../../realm-settings-section.css";

const Permissions = ({ name }: { name: string }) => {
  const { t } = useTranslation("realm-settings");
  const { control } = useFormContext();
  return (
    <Grid>
      <GridItem lg={4} sm={6}>
        <Controller
          name={`permissions.${name}`}
          control={control}
          defaultValue={[]}
          render={({ onChange, value }) => (
            <Checkbox
              id={`user-${name}`}
              label={t("user")}
              value="user"
              data-testid={`user-${name}`}
              isChecked={value.includes("user")}
              onChange={() => {
                const option = "user";
                const changedValue = value.includes(option)
                  ? value.filter((item: string) => item !== option)
                  : [option];

                onChange(changedValue);
              }}
              isDisabled={value.includes("admin")}
            />
          )}
        />
      </GridItem>
      <GridItem lg={8} sm={6}>
        <Controller
          name={`permissions.${name}`}
          control={control}
          defaultValue={[]}
          render={({ onChange, value }) => (
            <Checkbox
              id={`admin-${name}`}
              label={t("admin")}
              value="admin"
              data-testid={`admin-${name}`}
              isChecked={value.includes("admin")}
              onChange={() => {
                const option = "admin";
                const changedValue = value.includes(option)
                  ? value.filter((item: string) => item !== option)
                  : ["user", option];

                onChange(changedValue);
              }}
            />
          )}
        />
      </GridItem>
    </Grid>
  );
};

export const AttributePermission = () => {
  const { t } = useTranslation("realm-settings");

  return (
    <FormAccess role="manage-realm" isHorizontal>
      <FormGroup
        hasNoPaddingTop
        label={t("whoCanEdit")}
        labelIcon={
          <HelpItem
            helpText="realm-settings-help:whoCanEditHelp"
            fieldLabelId="realm-settings:whoCanEdit"
          />
        }
        fieldId="kc-who-can-edit"
      >
        <Permissions name="edit" />
      </FormGroup>
      <FormGroup
        hasNoPaddingTop
        label={t("whoCanView")}
        labelIcon={
          <HelpItem
            helpText="realm-settings-help:whoCanViewHelp"
            fieldLabelId="realm-settings:whoCanView"
          />
        }
        fieldId="kc-who-can-view"
      >
        <Permissions name="view" />
      </FormGroup>
    </FormAccess>
  );
};
