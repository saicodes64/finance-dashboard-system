You don’t need another document—you need a control checklist. Something you can glance at and immediately know: “Am I building this correctly or drifting?”

Here’s the tight, no-BS checklist mapped exactly to what they’ll evaluate.

⸻

🔥 1. Core System (must exist or you’re done)

Users & Roles
	•	User model created
	•	Roles defined: ADMIN, ANALYST, VIEWER
	•	User status (active/inactive)
	•	Role assigned to each user

👉 If roles are just stored but not enforced → useless

⸻

Financial Records
	•	Record model:
	•	amount
	•	type (income/expense)
	•	category
	•	date
	•	notes
	•	CRUD APIs working
	•	Records linked to user

👉 If no relation to user → weak design

⸻

Filtering
	•	Filter by date
	•	Filter by category
	•	Filter by type

👉 If filtering is missing → looks incomplete

⸻

Dashboard API (THIS is your differentiator)
	•	Total income
	•	Total expenses
	•	Net balance
	•	Category-wise breakdown
	•	Recent transactions

👉 If you create 5 endpoints instead of 1 clean summary → poor API design

⸻

⚠️ 2. Access Control (MOST IMPORTANT)
	•	Middleware for role checking
	•	Viewer → only dashboard
	•	Analyst → read-only access
	•	Admin → full control

👉 If ANY role can do everything → rejection level mistake

⸻

🧠 3. Backend Design (this is what they judge silently)
	•	Clean folder structure
	•	Controllers (no business logic inside)
	•	Services (actual logic here)
	•	Models separated
	•	Middleware separated

👉 If everything is in one file → junior signal

⸻

🛡️ 4. Validation & Errors
	•	Input validation (Joi/Zod/etc.)
	•	Proper status codes (400, 401, 403, 500)
	•	Clear error messages

👉 If your API accepts garbage → you lose credibility

⸻

💾 5. Database
	•	Schema properly designed
	•	Relationships handled
	•	Data persists correctly

👉 If data breaks on restart → incomplete

⸻

✨ 6. Bonus (adds weight fast)

Pick 2–3 max:
	•	Pagination
	•	Soft delete
	•	JWT auth
	•	Swagger/Postman docs

👉 Don’t overdo. Depth > features

⸻

📄 7. Submission Quality (most ignored, most important)
	•	Clean GitHub repo
	•	.gitignore used
	•	Proper commits
	•	README explains:
	•	architecture
	•	role logic
	•	assumptions

👉 If README is weak → they assume you didn’t think

⸻

🚨 Final Reality Filter

Before submission, ask:

“If I remove comments, does my structure still make sense?”

If answer = no → your design is weak.

⸻

Your daily use (this is how you actually use it)

Every day before stopping:
	•	What did I COMPLETE from checklist?
	•	What is still missing?
	•	Is access control working correctly?

Proper Role Behavior (for your system)

Admin
	•	Full control over system
	•	Can:
	•	Create/update/delete records
	•	Manage users
	•	Access dashboard

👉 Admin = system owner

⸻

Analyst (you called manager)
	•	Read-heavy role
	•	Can:
	•	View records
	•	Access dashboard
	•	Cannot:
	•	Modify records
	•	Manage users

👉 Analyst = data consumer

⸻

Viewer
	•	Minimal access
	•	Can:
	•	View dashboard only

👉 Viewer = passive observer

⸻

