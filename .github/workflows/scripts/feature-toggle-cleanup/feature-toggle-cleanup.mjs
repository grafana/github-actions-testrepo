import { parse } from 'csv-parse/sync';
import fs from 'fs';

/***
 * Feauture Flag Structure example
 *  Name: 'disableEnvelopeEncryption',
    Stage: 'GA',
    Owner: '@grafana/grafana-as-code',
    Created: '2022-05-24',
    requiresDevMode: 'false',
    RequiresLicense: 'false',
    RequiresRestart: 'false',
    FrontendOnly: 'false'
 * 
 */


export default function cleanupFeatureFlags() {
	const today = new Date();
	const inputFileContents = fs.readFileSync(process.env.FEATURE_TOGGLES_CSV_FILE_PATH);
	const parsedFeatureFlags = parse(inputFileContents, {
		columns: true,
		skip_empty_lines: true,
		cast: true,
		cast_date: true,
	  });

	for (const flag of parsedFeatureFlags) {
		console.log(flag);
		if (flag.Created > today.setMonth(today.getMonth() - 6)) {
			console.log(`The flag ${flag.Name} was created more than 6 months ago. It should be checked.`);
		}
	}
	

}
