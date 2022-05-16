import { Button, Modal, useMantineTheme } from "@mantine/core";
import { Prism } from "@mantine/prism";
import React, { useState } from "react";

interface RawViewerProps {
  logs: RenovateLogs;
  title: string;
  size: string | number;
}

const RawViewer = (props: RawViewerProps) => {
  const theme = useMantineTheme();
  const [isOpened, setisOpened] = useState(false);

  const code = React.useMemo(() => {
    return JSON.stringify(props.logs, null, 2);
  }, [props.logs]);

  return (
    <>
      <Button onClick={() => setisOpened(true)} color="violet">
        {props.title}
      </Button>
      <Modal
        overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={isOpened}
        onClose={() => setisOpened(false)}
        overflow={"inside"}
        size={props.size}
      >
        <Prism language="json">{code}</Prism>
      </Modal>
    </>
  );
};

export default RawViewer;
