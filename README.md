# baires-tracker

CLI tool to manage BairesDev time tracker

# Installation

```bash
npm install -g baires-tracker
```

# Configuration

Copy the file `sample-baires-tracker.env` into your home dir as `~/.baires-tracker.env` and fill out all fields in it.
 
```.env
CLOCKIFY_API_KEY=
CLOCKIFY_WORKSPACE_ID=
TT_USER=
TT_PASSWORD=
TT_FOCAL_POINT=
TT_PROJECT=
TT_CATEGORY=
TT_TASK=
```

Note: If you plan to use only basic CLI tracking (`track` command) you don't need to fill out the clockify section.

## Clockify

To use the API integration you need to first create a login at [Clockify](https://clockify.me/) and then create an API key at your user [settings](https://clockify.me/user/settings). 

Add your API key to `~/.baires-tracker.env` and the workspace id as well.

You can get your workspace id going to [workspace settings](https://clockify.me/workspaces) and then selecting the settings of the desired workspace. The workspageID is part of the url.

For example in this url `https://clockify.me/workspaces/0123456789abcdef/settings` the workspace id is `0123456789abcdef`.

To make clockify integration works smoothly you need to set up your clockify workspace according the equivalence table

|TimeTracker|Source|Field|
|-|-|-|
|Project|~/.baires-tracker.env|TT_PROJECT|
|Client Focal Point|~/.baires-tracker.env|TT_FOCAL_POINT|
|Task Description|clockify|Project|
|Task Category|clockify|Task|

To get some more context on how to configure clockify please refer to Clockify documentation:
- [Managing projects](https://clockify.me/help/projects/managing-projects)
- [Working with tasks](https://clockify.me/help/projects/working-with-tasks)

# Usage

The basic structure of a command is `baires-tracker <command> [options]`.
`Command` can be one of the following:

## help

```bash
$ baires-tracker help
> Usage: baires-tracker [options] [command]
>
> Options:
>   -V, --version   output the version number
>   -h, --help      display help for command
> 
> Commands:
>   api             Show entries from your API
>   list            Show entries already submited to TT
>   sync            Sync entries from API into TT
>   track           Manually track time to TT
>   help [command]  display help for command
```

## track
Manually submit a time entry to the TimeTracker tool.


Tracking 1.2 hours manually for a spike development task sample: 
```bash
$ baires-tracker track -d 22/11/21 -t 1.2 -c Development -s Spike -n "Testing framework A for UI POC"
> 22/11/2021 (1.20h) Development:Features development - Testing framework A for UI POC
```

## api
List all entries at the API for a specific time range.

List all api entries for 22/11/21:
```bash
$ baires-tracker api -d 22/11/21
> 22/11/2021 (2.50h) Development:Features development - DevProd separation
> 22/11/2021 (0.28h) Training (Trainer):Other - Training (Trainer) - Peer Mentoring
> 22/11/2021 (5.52h) Development:Features development - Creating new Feature for business website
> Total: 8.30
```

## list
Lists all entries already submitted to the TimeTracker tool for a specific time range.

List all TimeTracker entries for 22/11/21:
```bash
$ baires-tracker list -d 22/11/21
> 22/11/2021 (2.50h) Development:Features development - DevProd separation
> 22/11/2021 (0.28h) Training (Trainer):Other - Training (Trainer) - Peer Mentoring
> 22/11/2021 (5.52h) Development:Features development - Creating new Feature for business website
> Total: 8.30
```

## sync
Synchronizes API entries with TimeTracker.

List all TimeTracker entries for 22/11/21:
```bash
$ baires-tracker sync -d 22/11/21
> 22/11/2021 (2.50h) Development:Features development - DevProd separation
> 22/11/2021 (0.28h) Training (Trainer):Other - Training (Trainer) - Peer Mentoring
> 22/11/2021 (5.52h) Development:Features development - Creating new Feature for business website
> Total: 8.30
```

Currently the only API supported is clockify
