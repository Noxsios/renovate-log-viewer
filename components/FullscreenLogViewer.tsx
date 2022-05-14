import { Button, Modal, useMantineTheme } from "@mantine/core";
import { Prism } from "@mantine/prism";
import React, { useState } from "react";

interface FullscreenLogViewerProps {
  logs: RenovateLogs;
  title: string;
}

const FullscreenLogViewer = (props: FullscreenLogViewerProps) => {
  const theme = useMantineTheme();
  const [isOpened, setisOpened] = useState(false);

  const code = React.useMemo(() => {
    return JSON.stringify(props.logs, null, 2);
  }, [props.logs]);

  return (
    <>
      <Button onClick={() => setisOpened(true)}>{props.title}</Button>
      <Modal
        overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={isOpened}
        onClose={() => setisOpened(false)}
        overflow={"inside"}
        size={"full"}
      >
        <Prism language="json">{code}</Prism>
      </Modal>
    </>
  );
};

export default FullscreenLogViewer;
