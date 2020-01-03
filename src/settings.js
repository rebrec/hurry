import Path from 'path';

const modulesRoot = Path.join("d:", 'tmp\\dev\\js\\hurry\\src', 'modules');

export default {
    shellsPath: Path.join(modulesRoot, "shells"),
    shellFeaturesPath: Path.join(modulesRoot, "shellfeatures"),
    datasourcesPath: Path.join(modulesRoot, "datasources"),
}