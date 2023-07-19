import { CloudfrontInfo } from 'types/stats';
import { updateConfiguration } from 'services/configure';
import { useEffect, useState } from 'react';
import { deploy } from 'services/deploy';
import { destroy } from 'services/destroy';
import Paper from '@mui/material/Paper';
import { TextField, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Configure: React.FC<{ [key: string]: CloudfrontInfo }> = ({
  cloudfrontInfo
}) => {
  const theme = useTheme();
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [distributionId, setDistributionId] = useState<string>('');
  const [httpEndpoint, setHttpEndpoint] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [accessKeyId, setAccessKeyId] = useState<string>('');

  const cloudfrontInfoData = () => {
    const keys = Object.keys(cloudfrontInfo);
    console.log(cloudfrontInfo);
    if (keys.length > 0) {
      return keys.map((field) => {
        return (
          <li key={field}>
            <strong>{field.toUpperCase()}</strong>: {cloudfrontInfo[field]}
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
          region,
          accessKeyId
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
      <div>
        <h2> Create / Destroy Pipeline</h2>
        <Paper
          sx={{
            maxWidth: 936,
            height: '100%',
            margin: 'none',
            overflow: 'hidden',
            padding: '20px'
          }}
        >
          <div>
            <div id="cloudfront_info">
              <div>
                <h3>Canopy Pipeline</h3>
                <ul style={{ listStyleType: 'none' }}>{cloudfrontInfoData()}</ul>
              </div>
            </div>
            <div id="deploy_destroy">
              <div>
                <h3>Actions</h3>
                <div style={{ textAlign: 'center' }}>
                  <Card style={{ display: 'inline-block', margin: '20px', padding: "40px", width: '350px', textAlign: 'center' }}>
                    <Button
                      type="submit"
                      onClick={handleDeploy}
                      value="Deploy"
                      variant="contained"
                      style={{ display: 'block', textAlign: 'center', height: '100px', width: '100%' }}
                    >
                      Deploy
                    </Button>
                    <p style={{ display: 'inline-block', textAlign: 'center' }}>
                      Click this button to <strong>deploy</strong> your Canopy Pipeline
                    </p>
                  </Card>
                  <Card style={{ display: 'inline-block', margin: '20px', padding: "40px", width: '350px', textAlign: 'center' }}>
                  <Button
                      type="submit"
                      onClick={handleDestroy}
                      value="Destroy"
                      variant="contained"
                      style={{ display: 'block', textAlign: 'center', height: '100px', width: '100%' }}
                    >
                      Destroy
                    </Button>
                    <p style={{ display: 'inline-block', textAlign: 'center' }}>
                      Click this button to <strong>destroy</strong> your Canopy Pipeline
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </Paper>
        <h2>Configure Pipeline</h2>
        <Paper
          sx={{
            maxWidth: 936,
            height: '100%',
            margin: 'none',
            overflow: 'hidden',
            padding: 2
          }}
        >
          <form
            noValidate
            autoComplete="off"
            style={{ padding: '10px' }}
            onSubmit={handleSubmitConfigureForm}
          >
            <TextField
              label="AWS account number:"
              name="AWS account number"
              variant="outlined"
              color={'primary'}
              fullWidth
              required
              value={accountNumber}
              onChange={(
                event: React.ChangeEvent & { target: HTMLInputElement }
              ) => {
                setAccountNumber(event.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              label="CloudFront Distribution ID:"
              name="CloudFront Distribution ID"
              variant="outlined"
              color={'primary'}
              fullWidth
              required
              value={distributionId}
              onChange={(
                event: React.ChangeEvent & { target: HTMLInputElement }
              ) => {
                setDistributionId(event.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              label="HTTP Endpoint (URI)"
              name="HTTP Endpoint (URI)"
              variant="outlined"
              color={'primary'}
              fullWidth
              required
              value={httpEndpoint}
              onChange={(
                event: React.ChangeEvent & { target: HTMLInputElement }
              ) => {
                setHttpEndpoint(event.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              label="AWS Secret Access Key"
              name="AWS Secret Access Key"
              variant="outlined"
              color={'primary'}
              fullWidth
              required
              value={secretKey}
              onChange={(
                event: React.ChangeEvent & { target: HTMLInputElement }
              ) => {
                setSecretKey(event.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              label="AWS Access Key ID"
              name="AWS Access Key ID"
              variant="outlined"
              color={'primary'}
              fullWidth
              required
              value={accessKeyId}
              onChange={(
                event: React.ChangeEvent & { target: HTMLInputElement }
              ) => {
                setAccessKeyId(event.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              label="AWS Region"
              name="AWS Region"
              variant="outlined"
              color={'primary'}
              fullWidth
              required
              value={region}
              onChange={(
                event: React.ChangeEvent & { target: HTMLInputElement }
              ) => {
                setRegion(event.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              style={{ display: 'inline-block', textAlign: 'center', margin: '10px' }}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default Configure;
