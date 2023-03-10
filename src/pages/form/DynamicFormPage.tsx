import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useMobxStore } from '../../store/MobxStoreProvider';
import ExternalApi from '../../api/ExternalApi';
import './DynamicFormPage.css';

const DynamicFormPage = observer(() => {
  const mobxStore = useMobxStore();
  const externalApi = new ExternalApi();

  useEffect(() => {
    // Retrieve data from external API
    const fetchData = async () => {
      const apiData = await externalApi.getDataFromApi();
      mobxStore.setDynamicFormData(apiData);
    };
    fetchData();
  }, []);

  if (!mobxStore.getDynamicFormData()) {
    return <div>Loading...</div>;
  }

  // Parse the retrieved data and create a dynamic form
  const parsedData = JSON.parse(mobxStore.getDynamicFormData());

  const formInputs = Object.keys(parsedData.Labels).map((key) => (
    <div key={key}>
      <label className='dynamic-form label'>
        {key}:
        <input type='text' value={parsedData.Labels[key]} readOnly className='dynamic-form input' />
      </label>
    </div>
  ));

  return (
    <div className='dynamic-form'>
      <h1 className='dynamic-form h1'>Dynamic Form</h1>
      {formInputs}
    </div>
  );
});

export default DynamicFormPage;
