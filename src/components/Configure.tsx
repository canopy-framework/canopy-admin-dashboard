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
    <div className="ml-60 min-h-screen bg-gray-100 pl-10 pt-24">
      <h1 className="text-4xl">Configure</h1>
      <div className="mr-5 min-h-full border-2 border-solid border-black pl-3 pr-5 pt-8">
        <h2 className="text-xl"> Create / Destroy Pipeline</h2>
        <div className="h-60 border-2 border-solid border-black bg-white">
          <div id="cloudfront_info" className="flex gap-5 pl-5">
            <div>
              <h3 className="text-lg font-bold">Summary</h3>
              <ul>{cloudfrontInfoData()}</ul>
            </div>
          </div>
          <div id="deploy_destroy" className="flex gap-5 pl-5">
            <div>
              <h3 className="text-lg font-bold">Actions</h3>
              <input
                className="block"
                type="submit"
                value="Deploy"
                onClick={handleDeploy}
              />
              <input
                className="block"
                type="submit"
                value="Destroy"
                onClick={handleDestroy}
              />
            </div>
          </div>
        </div>
        <h2 className="mt-5 text-xl">Configure</h2>
        <div className="h-full border-2 border-solid border-black bg-white">
          <form className="block" onSubmit={handleSubmitConfigureForm}>
            <fieldset className="pb-5">
              <label className="ml-4 block pt-3">
                AWS account number:
                <input
                  className="block border-2 border-black"
                  type="text"
                  value={accountNumber}
                  onChange={(
                    event: React.ChangeEvent & { target: HTMLInputElement }
                  ) => {
                    setAccountNumber(event.target.value);
                  }}
                />
              </label>
              <label className="ml-4 block pt-3">
                CloudFront Distribution ID:
                <input
                  className="block border-2 border-black"
                  type="text"
                  value={distributionId}
                  onChange={(
                    event: React.ChangeEvent & { target: HTMLInputElement }
                  ) => {
                    setDistributionId(event.target.value);
                  }}
                />
              </label>
              <label className="ml-4 block pt-3">
                HTTP endpoint (URI)
                <input
                  className="block border-2 border-black"
                  type="text"
                  value={httpEndpoint}
                  onChange={(
                    event: React.ChangeEvent & { target: HTMLInputElement }
                  ) => {
                    setHttpEndpoint(event.target.value);
                  }}
                />
              </label>
              <label className="ml-4 block pt-3">
                AWS secret access key
                <input
                  className="block border-2 border-black"
                  type="text"
                  value={secretKey}
                  onChange={(
                    event: React.ChangeEvent & { target: HTMLInputElement }
                  ) => {
                    setSecretKey(event.target.value);
                  }}
                />
              </label>
              <label className="ml-4 block pt-3">
                AWS region
                <input
                  className="block border-2 border-black"
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
