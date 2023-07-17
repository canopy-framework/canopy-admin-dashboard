import { CloudfrontInfo } from 'types/stats';
import { updateConfiguration } from 'services/configure';
import { useEffect, useState } from 'react';
import { deploy } from 'services/deploy';
import { destroy } from 'services/destroy';

const Configure: React.FC<{ [key: string]: CloudfrontInfo }> = ({
  cloudfrontInfo
}) => {
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [distributionId, setDistributionId] = useState<string>('');
  const [httpEndpoint, setHttpEndpoint] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [region, setRegion] = useState<string>('');

  const cloudfrontInfoData = () => {
    const keys = Object.keys(cloudfrontInfo);
    console.log(cloudfrontInfo);
    if (keys.length > 0) {
      return keys.map((field) => {
        return (
          <li key={field}>
            {field}: {cloudfrontInfo[field]}
          </li>
        );
      });
    }
  };
  function validHttpEndpoint(endpoint: string): boolean {
    const regex = new RegExp('^https://.*');
    return regex.test(endpoint);
  }
  const handleSubmitConfigureForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (validHttpEndpoint(httpEndpoint)) {
      try {
        const confirm = await updateConfiguration(
          accountNumber,
          distributionId,
          httpEndpoint,
          secretKey,
          region
        );
      } catch (error) {
        console.error('Failed to update AWS configuration ' + error);
      }
    } else {
      alert('invalid http endpoint. Must match "https://"');
    }
  };

  const handleDeploy = async () => {
    try {
      await deploy();
    } catch (err) {
      console.error(err);
    }
  };
  const handleDestroy = async () => {
    try {
      await destroy();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Configure</h1>
      <div>
        <h2> Create / Destroy Pipeline</h2>
        <div>
          <div id="cloudfront_info">
            <div>
              <h3>Summary</h3>
              <ul>{cloudfrontInfoData()}</ul>
            </div>
          </div>
          <div id="deploy_destroy">
            <div>
              <h3>Actions</h3>
              <input type="submit" value="Deploy" onClick={handleDeploy} />
              <input type="submit" value="Destroy" onClick={handleDestroy} />
            </div>
          </div>
        </div>
        <h2>Configure</h2>
        <div>
          <form onSubmit={handleSubmitConfigureForm}>
            <fieldset>
              <label>
                AWS account number:
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(
                    event: React.ChangeEvent & { target: HTMLInputElement }
                  ) => {
                    setAccountNumber(event.target.value);
                  }}
                />
              </label>
              <label>
                CloudFront Distribution ID:
                <input
                  type="text"
                  value={distributionId}
                  onChange={(
                    event: React.ChangeEvent & { target: HTMLInputElement }
                  ) => {
                    setDistributionId(event.target.value);
                  }}
                />
              </label>
              <label>
                HTTP endpoint (URI)
                <input
                  type="text"
                  value={httpEndpoint}
                  onChange={(
                    event: React.ChangeEvent & { target: HTMLInputElement }
                  ) => {
                    setHttpEndpoint(event.target.value);
                  }}
                />
              </label>
              <label>
                AWS secret access key
                <input
                  type="text"
                  value={secretKey}
                  onChange={(
                    event: React.ChangeEvent & { target: HTMLInputElement }
                  ) => {
                    setSecretKey(event.target.value);
                  }}
                />
              </label>
              <label>
                AWS region
                <input
                  type="text"
                  value={region}
                  onChange={(
                    event: React.ChangeEvent & { target: HTMLInputElement }
                  ) => {
                    setRegion(event.target.value);
                  }}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Configure;
