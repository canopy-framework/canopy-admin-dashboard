import { CloudfrontInfo } from 'types/stats';
import { updateConfiguration, addDistro } from 'services/configure';
import { useEffect, useState } from 'react';
import { deploy } from 'services/deploy';
import { destroy } from 'services/destroy';
import Paper from '@mui/material/Paper';
import { TextField, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Configure = ({
  allCloudfrontDistroData
}) => {
  const theme = useTheme();
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [distributionId, setDistributionId] = useState<string>('');
  const [newDistributionId, setNewDistributionId] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [accessKeyId, setAccessKeyId] = useState<string>('');

  const handleSubmitConfigureForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const confirm = await updateConfiguration(
        accountNumber,
        distributionId,
        secretKey,
        region,
        accessKeyId
      );
      alert('Your configuration details were successfully submitted.');
    } catch (error) {
      alert('There was an error submitting your configuration details.');
      console.log('Failed to update AWS configuration ' + error);
    }
  };

  const handleDeploy = async () => {
    try {
      await deploy();
      alert('Your Canopy Pipeline has been successfully deployed.');
    } catch (err) {
      alert('There was a problem while deploying your Canopy Pipeline.');
      console.error(err);
    }
  };
  const handleDestroy = async () => {
    try {
      await destroy();
      alert('Your Canopy Pipeline has been successfully destroyed.');
    } catch (err) {
      alert('There was a problem while destroying your Canopy Pipeline.');
      console.error(err);
    }
  };
  const handleAddDistro = async (event) => {
    event.preventDefault();
    try {
      await addDistro(newDistributionId);
      alert('Your new distribution has been added to your Canopy Pipeline.');
    } catch (err) {
      alert('There was a problem while adding the new distribution to your Canopy Pipeline.');
      console.error(err);
    }
  };
  const cardStyle = {
    display: 'inline-block',
    margin: '10px',
    padding: '20px',
    height: '270px',
    width: '250px',
    textAlign: 'center'
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
                {allCloudfrontDistroData()}
              </div>
            </div>
            <div id="deploy_destroy">
              <div>
                <h3>Actions</h3>
                <div style={{ textAlign: 'center' }}>
                  <Card style={cardStyle}>
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
                  <Card style={cardStyle}>
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
                  <Card style={cardStyle}>
                    <form
                      noValidate
                      autoComplete="off"
                      style={{ }}
                      onSubmit={handleAddDistro}
                    >
                      <TextField
                        label="New Distribution ID:"
                        name="New Distribution ID"
                        variant="outlined"
                        color={'primary'}
                        fullWidth
                        required
                        value={newDistributionId}
                        onChange={(
                          event: React.ChangeEvent & { target: HTMLInputElement }
                        ) => {
                          setNewDistributionId(event.target.value);
                        }}
                        sx={{ height: '50px', marginBottom: '5px' }}
                      />
                      <Button
                        type="submit"
                        value="newDistributionId"
                        variant="contained"
                        style={{ display: 'block', textAlign: 'center', height: '40px', width: '100%', marginTop: '5px' }}
                      >
                        Add New Distribution
                      </Button>
                    </form>
                    <p style={{ display: 'inline-block', textAlign: 'center' }}>
                        Click this button to <strong>add</strong> a new distribution to your Canopy Pipeline
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
