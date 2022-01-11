import React from "react";
import "../../../../index.scss";
import BASEgcp from "../../../../assets/images/logo/BASEgcp.svg";

export default function ComplianceHeader() {
  return (
    <div className="flex-r flex-jc-sp-btn bg-w">
      <div
        className="flex-c"
        style={{
          backgroundImage: `url(${BASEgcp})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <p className="fw-700 f-48 ml-22 pt-15 lh-1-3">
          <span className="fc-tertiary">GCP</span> Compliance
        </p>
        <div className="flex-r ml-20 lh-1-2">
          <p className="f-darkgrey fw-600">
            PROJECT: <span className="f-blue fw-400">titan-testDemo </span>
          </p>
          <p className="ml-5 f-darkgrey fw-600">
            CLOUD TENANT ID: <span className="f-blue fw-400">bds6445934375</span>
          </p>
        </div>
      </div>
      <div className="flex-r">
        <div className="flex-c-jc mr-10">
          <p>
            Tenet ID:{" "}
            <span className="fc-primary">
              <u>86224987</u>
            </span>
          </p>
          <p className="divider-grey"></p>
          <p>
            Org ID:{" "}
            <span className="fc-primary">
              <u>bds2021aws</u>
            </span>
          </p>
        </div>
        <div className="flex-c-jc-ac">
          <button className="no-bdr fc-tertiary mt-15 bg-DarkDesaturatedBlue pt-15 pb-15 pl-45 pr-45 f-14">New Scan</button>
          <p className="font-10 fc-primary mt-2">
            Last Scan: <span>13-11-2021</span>
          </p>
        </div>
      </div>
    </div>
  );
}