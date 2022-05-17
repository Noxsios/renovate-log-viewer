import { Group, Text, useMantineTheme, MantineTheme, Code } from "@mantine/core";
import { Upload, X, Icon as TablerIcon, FileImport } from "tabler-icons-react";
import { Dropzone, DropzoneStatus } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({ status, ...props }: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <FileImport {...props} />;
}

export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: "none" }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />

    <div>
      <Text size="xl" inline>
        Drag renovate&apos;s log file here or click to select
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Max size: 5MB
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        ex. <Code>renovate.log</Code>
      </Text>
    </div>
  </Group>
);

interface DropProps {
  setLogs: React.Dispatch<React.SetStateAction<RenovateLogs>>;
}

function Drop(props: DropProps) {
  const theme = useMantineTheme();

  const parseLogs = (messy: string) => {
    const logs = messy
      .split("\n")
      .filter((line) => {
        return line.trim().length > 0;
      })
      .map((log) => {
        try {
          return JSON.parse(log);
        } catch (e) {
          return null;
        }
      });

    if (logs.includes(null)) {
      showNotification({
        title: "Invalid File",
        message: "Please upload a valid renovate log file.",
        color: "red",
      });
    }

    return logs;
  };

  const handleDrop = async (files: File[]) => {
    if (files[0].name.endsWith(".log")) {
      const logFile = await files[0].text();
      const logs = parseLogs(logFile);
      props.setLogs(logs);
    } else {
      showNotification({
        title: "Invalid File",
        message: "Please upload a valid renovate log file.",
        color: "red",
      });
    }
  };

  return (
    <Dropzone onDrop={handleDrop} onReject={(files) => console.log("rejected files", files)} maxSize={7 * 1024 ** 2} multiple={false}>
      {(status) => dropzoneChildren(status, theme)}
    </Dropzone>
  );
}

export default Drop;
