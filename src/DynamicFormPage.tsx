import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useMobxStore } from "./MobxStoreProvider";
import ExternalApi from "./ExternalApi";

const DynamicFormPage = observer(() => {
  const mobxStore = useMobxStore();
  const externalApi = new ExternalApi();

  useEffect(() => {
    // Retrieve data from external API
    const fetchData = async () => {
      const apiData = await externalApi.getDataFromApi();
      mobxStore.setDynamicFormData(apiData)
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
      <label>
        {key}:
        <input type="text" value={parsedData.Labels[key]} readOnly />
      </label>
    </div>
  ));

  return (
    <div>
      <h1>Dynamic Form</h1>
      {formInputs}
    </div>
  );
});

export default DynamicFormPage;
