import { useState, useEffect } from 'react';
import { getQuickAlerts, alert } from 'services/alert';
import { Alerts as AlertsStateObj, AlertNamesArray } from 'types/alert';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const Alerts: React.FC = () => {
  const [quickAlerts, setQuickAlerts] = useState<AlertsStateObj>({});

  useEffect(() => {
    getQuickAlerts().then((choices) => {
      setQuickAlerts(choices);
    });
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent & { target: HTMLInputElement }
  ) => {
    event.preventDefault();
    const newStateObj = JSON.parse(JSON.stringify(quickAlerts));
    newStateObj[event.target.id]['selected'] =
      !newStateObj[event.target.id]['selected'];
    setQuickAlerts(newStateObj);
  };

  const handleSubmitAlertForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const options = Object.keys(quickAlerts);
    const selectedAlerts: AlertNamesArray = [];

    options.forEach((option) => {
      if (quickAlerts[option]['selected']) {
        selectedAlerts.push(option);
      }
    });
    const successfullyConfiguredAlerts = await alert(selectedAlerts);
    changeActiveState(successfullyConfiguredAlerts);
  };

  const changeActiveState = (successfulConfiguredAlerts: AlertNamesArray) => {
    const newStateObj = JSON.parse(JSON.stringify(quickAlerts));
    successfulConfiguredAlerts.forEach((alertKey) => {
      newStateObj[alertKey]['active'] = true;
    });
    setQuickAlerts(newStateObj);
  };

  const quickAlertsList = () => {
    const alertNames = Object.keys(quickAlerts);
    if (alertNames.length > 0) {
      return alertNames
        .filter((name) => {
          return !quickAlerts[name]['active'];
        })
        .map((name) => {
          const checked = quickAlerts[name]['selected'];
          return (
            <div key={`${name}:${checked}`}>
              <label>
                <input
                  type="checkbox"
                  id={name}
                  checked={checked}
                  name="alerts"
                  onChange={handleInputChange}
                  readOnly
                />
                {quickAlerts[name]['name']}: ({quickAlerts[name]['title']})
              </label>
            </div>
          );
        });
    } else {
      return <li>No quick alerts availble at this time</li>;
    }
  };

  const activeQuickAlertsList = () => {
    const alertNames = Object.keys(quickAlerts);
    if (alertNames.length > 0) {
      return alertNames
        .filter((name) => {
          return quickAlerts[name]['active'];
        })
        .map((name) => {
          return (
            <div key={name}>
              <p>{quickAlerts[name]['title']}</p>
            </div>
          );
        });
    } else {
      return <li>No quick alerts availble at this time</li>;
    }
  };
  return (
    <div>
      <h2>Quick Alerts</h2>
      <Paper
        sx={{
          maxWidth: 936,
          height: '100%',
          margin: 'none',
          overflow: 'hidden'
        }}
      >
        <div>
          <h2>Add Quick Alerts</h2>
          <div>
            <div id="alert_listing">
              <form onSubmit={handleSubmitAlertForm}>
                <fieldset id="quick_alert_form" style={{ border: 'none' }}>
                  {quickAlertsList()}
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ display: 'inline-block', textAlign: 'center' }}
                  >
                    Configure Alerts
                  </Button>
                </fieldset>
              </form>
            </div>
          </div>
          <h2>Active Alerts</h2>
          <div>{activeQuickAlertsList()}</div>
        </div>
      </Paper>
    </div>
  );
};

export default Alerts;
