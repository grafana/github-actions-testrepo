module.exports = async ({ github, context, core, runId }) => {
    const AdmZip = require('adm-zip');
    const fs = require('fs');

    const { owner, repo } = context.repo;
    
    const { data } = await github.rest.actions.listWorkflowRunArtifacts({
        owner, 
        repo, 
        run_id: runId,
    });

    const artifact = data.artifacts.find(a => a.name === 'message');
    
    if (!artifact) {
        core.restFailed('Could not find artifact in source workflow');
        return;
    }

    const zip = await github.rest.actions.downloadArtifact({
        owner,
        repo,
        artifact_id: artifact.id,
        archive_format: "zip",
    });

    const dir = './output';
    await mkdir(fs, dir);

    const admZip = new AdmZip(Buffer.from(zip.data));
    admZip.extractAllTo(dir, true);

    const content = await readFile(fs, `${dir}/result.json`);
    const result = JSON.parse(content);

    for (const property in result) {
        core.setOutput(property, result[property]);
    }
}

async function mkdir(fs, path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, { recursive: true }, (error) => {
            if (error) return reject(error);
            return resolve();
        });
    });
}

async function readFile(fs, path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, data) => {
            if (error) return reject(error);
            return resolve(data);
        });
    });
}