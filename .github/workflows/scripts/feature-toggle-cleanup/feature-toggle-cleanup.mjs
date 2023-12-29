import { parse } from 'csv-parse/sync';

export default function printStuff() {
	const inputFileContents = fs.readFileSync(process.env.FEATURE_TOGGLES_CSV_FILE_PATH);
	const records = parse(input, {
		columns: true,
		skip_empty_lines: true
	  });
	console.log(records);
}
