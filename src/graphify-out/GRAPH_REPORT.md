# Graph Report - C:\Users\esteb\Projects\almond-mom-kitchen\src  (2026-06-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 91 nodes · 107 edges · 16 communities (11 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]

## God Nodes (most connected - your core abstractions)
1. `createClient()` - 7 edges
2. `fetchAI()` - 5 edges
3. `cn()` - 5 edges
4. `analyzeCraving()` - 3 edges
5. `auditFridgeItem()` - 3 edges
6. `generateCleanRecipe()` - 3 edges
7. `upgradeGroceryList()` - 3 edges
8. `signUp()` - 3 edges
9. `signIn()` - 3 edges
10. `InputField()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `signOut()` --calls--> `createClient()`  [EXTRACTED]
  app/actions/auth.ts → utils/supabase/server.ts
- `updateProfile()` --calls--> `createClient()`  [EXTRACTED]
  app/actions/auth.ts → utils/supabase/server.ts
- `getUserProfile()` --calls--> `createClient()`  [EXTRACTED]
  app/actions/auth.ts → utils/supabase/server.ts
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts
- `signUp()` --calls--> `createClient()`  [EXTRACTED]
  app/actions/auth.ts → utils/supabase/server.ts

## Import Cycles
- None detected.

## Communities (16 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (14): AIResponse, analyzeCraving(), auditFridgeItem(), CleanRecipeData, CravingData, fetchAI(), FridgeAuditData, generateCleanRecipe() (+6 more)

### Community 1 - "Community 1"
Cohesion: 0.23
Nodes (9): geist, metadata, outfit, playfair, RootLayout(), SEOHandler(), cn(), Button() (+1 more)

### Community 2 - "Community 2"
Cohesion: 0.46
Nodes (6): getUserProfile(), signIn(), signOut(), signUp(), updateProfile(), createClient()

### Community 3 - "Community 3"
Cohesion: 0.39
Nodes (4): InputField(), InputFieldProps, LoginPage(), createClient()

### Community 6 - "Community 6"
Cohesion: 0.60
Nodes (3): config, proxy(), createClient()

### Community 7 - "Community 7"
Cohesion: 0.40
Nodes (3): Ingredient, Recipe, RECIPE_DB

## Knowledge Gaps
- **22 isolated node(s):** `AIResponse`, `CravingData`, `FridgeAuditData`, `CleanRecipeData`, `GroceryUpgradeItem` (+17 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `AIResponse`, `CravingData`, `FridgeAuditData` to the rest of the system?**
  _22 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._