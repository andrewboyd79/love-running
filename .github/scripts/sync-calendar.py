import json
import os
import sys
from datetime import datetime, timezone

import requests
from icalendar import Calendar

url = os.environ.get("ICAL_URL", "")
if not url:
    print("ICAL_URL not set — skipping sync")
    sys.exit(0)

try:
    response = requests.get(url, timeout=30)
    response.raise_for_status()
except requests.RequestException as e:
    print(f"Failed to fetch calendar: {e}")
    sys.exit(1)

cal = Calendar.from_ical(response.text)
now = datetime.now(timezone.utc)
events = []

for component in cal.walk():
    if component.name != "VEVENT":
        continue
    dtstart = component.get("dtstart")
    if dtstart is None:
        continue
    start = dtstart.dt
    if not hasattr(start, "tzinfo"):
        start = datetime(start.year, start.month, start.day, tzinfo=timezone.utc)
    elif start.tzinfo is None:
        start = start.replace(tzinfo=timezone.utc)
    if start < now:
        continue
    events.append({
        "id": str(component.get("uid", "")),
        "title": str(component.get("summary", "")),
        "date": start.strftime("%Y-%m-%d"),
        "location": str(component.get("location", "")),
        "description": str(component.get("description", "")),
        "link": str(component.get("url", ""))
    })

events.sort(key=lambda e: e["date"])

output_path = os.path.join(os.path.dirname(__file__), "../../data/events.json")
with open(output_path, "w") as f:
    json.dump(events, f, indent=2)
    f.write("\n")
print(f"Wrote {len(events)} upcoming events to data/events.json")
