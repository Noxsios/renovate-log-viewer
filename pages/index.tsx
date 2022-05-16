import type { NextPage } from 'next'
import Head from "next/head";
import Drop from "../components/Drop";
import { useState } from "react";
import RawViewer from "../components/RawViewer";
import { Button, Stack, Container, Title, Text, Box, LoadingOverlay } from "@mantine/core";
import { FileOff } from "tabler-icons-react";
import { lazy, Suspense } from "react";

const ProgressiveTable = lazy(() => import("../components/ProgressiveTable"));

const Home: NextPage = () => {
  const [logs, setLogs] = useState([] as RenovateLogs);

  return (
    <>
      <Head>
        <title>renovate-log-viewer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Box sx={{ margin: "1rem", padding: "0.5rem", backdropFilter: "blur(4px)" }}>
          <Title order={1}>renovate-log-viewer</Title>
          <Text color={"dimmed"}>A tool to view renovate logs.</Text>
        </Box>
      </Container>
      {logs.length === 0 && (
        <Container>
          <Drop setLogs={setLogs} />
        </Container>
      )}

      {logs.length > 0 && (
        <Suspense fallback={<LoadingOverlay visible={true} />}>
          <Container>
            <Stack px={"2rem"}>
              <Button variant="light" onClick={() => setLogs([])} rightIcon={<FileOff />} color="gray">
                Upload a new log file
              </Button>
              <RawViewer logs={logs} title="View Raw JSON (slow)" size={"full"} />
            </Stack>
          </Container>
          <ProgressiveTable logs={logs} />
        </Suspense>
      )}
    </>
  );
};

export default Home
