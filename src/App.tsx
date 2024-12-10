import { Button } from "@/ui/button";
import { useState } from "react";
import Configurator, {
  type ConfiguratorProps,
} from "./components/configurator";

import Questions, { Schema as QuestionSchema } from "./components/questions";
import ClueCard, {
  Schema as ClueButtonSchema,
} from "./components/clue-button";

const RenderComponents = {
  Questions,
  ClueCard
}
// mock本地写死的schema
const schemas = [QuestionSchema, ClueButtonSchema];

const Components = (schemas ?? []).reduce<Record<string, string>>((p, c) => {
  return {
    ...p,
    [c.component]: c.renderComponent || c.component,
  };
}, {});

type ConfirmFunction = Required<ConfiguratorProps>["handleConfirm"]

const App = () => {
  const [open, setOpen] = useState(false);
  const [renderList, setRenderList] = useState<Parameters<ConfirmFunction>[0][]>([])

  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm: ConfirmFunction = (
    value
  ) => {
    setRenderList([
      ...renderList,
      value
    ])
  };

  return (
    <div className="w-screen h-screen flex p-4">
      <div className="border border-solid border-blue-500 rounded-xl h-full w-full p-4">
        <Button onClick={handleAdd}>添加组件</Button>

        {
          renderList.map(item => {
            const Component = RenderComponents[Components[item.component]];

            console.log('comp =>', Component, Components, item.component)

            if (!Component) return null

            return <Component key={item.component} {...item.props} />
          })
        }
      </div>

      <Configurator
        open={open}
        schemas={schemas}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </div>
  );
};

export default App;
